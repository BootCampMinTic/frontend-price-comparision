import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { SaleService } from '../../services/sale.service';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../core/notification.service';
import { PageHeader } from '../../shared/page-header.component';
import { EmptyState } from '../../shared/empty-state.component';
import { Sale, CreateSale, Product } from '../../models';

@Component({
  selector: 'app-sales',
  imports: [
    FormsModule, TableModule, ButtonModule, DialogModule, CardModule,
    ProgressSpinnerModule, TagModule, SelectModule, MultiSelectModule,
    DatePipe, DecimalPipe, PageHeader, EmptyState,
  ],
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
  private readonly saleService = inject(SaleService);
  private readonly productService = inject(ProductService);
  private readonly notification = inject(NotificationService);
  private readonly confirm = inject(ConfirmationService);

  protected readonly sales = signal<Sale[]>([]);
  protected readonly products = signal<Product[]>([]);
  protected readonly loading = signal(true);
  protected readonly dialogVisible = signal(false);
  protected readonly expandedIds = signal<Set<number>>(new Set());

  protected form = { userId: 2, storeId: 1, stateId: 1, productIds: [] as number[] };
  protected productOptions: { label: string; value: number }[] = [];

  ngOnInit(): void {
    this.productService.getAll(1, 200).subscribe((r) => {
      this.products.set(r.data);
      this.productOptions = r.data.map((p) => ({ label: `${p.name} ($${p.price})`, value: p.id }));
    });
    this.loadSales();
  }

  protected loadSales(): void {
    this.loading.set(true);
    this.saleService.getAll(1, 100).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (r) => this.sales.set(r.data),
      error: () => this.notification.error('Error al cargar ventas'),
    });
  }

  protected openCreate(): void {
    this.form = { userId: 2, storeId: 1, stateId: 1, productIds: [] };
    this.dialogVisible.set(true);
  }

  protected save(): void {
    if (this.form.productIds.length === 0) {
      this.notification.warn('Selecciona al menos un producto');
      return;
    }
    const dto: CreateSale = { ...this.form, date: new Date().toISOString() };
    this.saleService.create(dto).subscribe({
      next: () => { this.notification.success('Venta registrada'); this.dialogVisible.set(false); this.loadSales(); },
      error: () => this.notification.error('Error al registrar venta'),
    });
  }

  protected confirmDelete(sale: Sale): void {
    this.confirm.confirm({
      message: `Eliminar la venta #${sale.id}?`,
      header: 'Confirmar eliminacion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      accept: () => {
        this.saleService.delete(sale.id).subscribe({
          next: () => { this.notification.success('Venta eliminada'); this.loadSales(); },
          error: () => this.notification.error('Error al eliminar venta'),
        });
      },
    });
  }

  protected toggleExpand(id: number): void {
    const set = new Set(this.expandedIds());
    if (set.has(id)) {
      set.delete(id);
    } else {
      set.add(id);
    }
    this.expandedIds.set(set);
  }

  protected isExpanded(id: number): boolean {
    return this.expandedIds().has(id);
  }

  protected getSaleTotal(sale: Sale): number {
    if (!sale.products?.length) return 0;
    return sale.products.reduce((sum, p) => sum + (p.productPrice || 0), 0);
  }

  protected getProductName(productId: number): string {
    return this.products().find((p) => p.id === productId)?.name ?? `#${productId}`;
  }

  protected getEstimatedTotal(): number {
    return this.form.productIds.reduce((sum, pid) => {
      const product = this.products().find((p) => p.id === pid);
      return sum + (product?.price ?? 0);
    }, 0);
  }
}
