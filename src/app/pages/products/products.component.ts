import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { CategoryProductService } from '../../services/category-product.service';
import { NotificationService } from '../../core/notification.service';
import { PageHeader } from '../../shared/page-header.component';
import { EmptyState } from '../../shared/empty-state.component';
import { Product, CreateProduct, Store, CategoryProduct } from '../../models';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule, TableModule, ButtonModule, DialogModule, CardModule,
    ProgressSpinnerModule, TagModule, InputTextModule, InputNumberModule, SelectModule,
    CurrencyPipe, PageHeader, EmptyState,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly storeService = inject(StoreService);
  private readonly categoryService = inject(CategoryProductService);
  private readonly notification = inject(NotificationService);
  private readonly confirm = inject(ConfirmationService);

  protected readonly products = signal<Product[]>([]);
  protected readonly stores = signal<Store[]>([]);
  protected readonly categories = signal<CategoryProduct[]>([]);
  protected readonly loading = signal(true);
  protected readonly dialogVisible = signal(false);
  protected readonly isEditing = signal(false);
  protected readonly currentId = signal<number | null>(null);
  protected readonly filterStoreId = signal<number | null>(null);

  protected form: CreateProduct = { name: '', price: 0, storeId: 1, categoryProductId: 1 };
  protected storeOptions: { label: string; value: number }[] = [];
  protected categoryOptions: { label: string; value: number }[] = [];

  ngOnInit(): void {
    this.storeService.getAll(1, 100).subscribe((r) => {
      this.stores.set(r.data);
      this.storeOptions = r.data.map((s) => ({ label: s.name, value: s.id }));
    });
    this.categoryService.getAll().subscribe((r) => {
      this.categories.set(r);
      this.categoryOptions = r.map((c) => ({ label: c.description, value: c.id }));
    });
    this.loadProducts();
  }

  protected loadProducts(): void {
    this.loading.set(true);
    const storeId = this.filterStoreId();
    const req = storeId
      ? this.productService.getByStore(storeId, 1, 100)
      : this.productService.getAll(1, 100);
    req.pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (r) => this.products.set(r.data),
      error: () => this.notification.error('Error al cargar productos'),
    });
  }

  protected openCreate(): void {
    this.isEditing.set(false);
    this.currentId.set(null);
    this.form = { name: '', price: 0, storeId: 1, categoryProductId: 1 };
    this.dialogVisible.set(true);
  }

  protected openEdit(product: Product): void {
    this.isEditing.set(true);
    this.currentId.set(product.id);
    this.form = { name: product.name, price: product.price, storeId: product.storeId, categoryProductId: product.categoryProductId };
    this.dialogVisible.set(true);
  }

  protected save(): void {
    if (this.isEditing() && this.currentId()) {
      this.productService.update(this.currentId()!, this.form).subscribe({
        next: () => { this.notification.success('Producto actualizado'); this.dialogVisible.set(false); this.loadProducts(); },
        error: () => this.notification.error('Error al actualizar producto'),
      });
    } else {
      this.productService.create(this.form).subscribe({
        next: () => { this.notification.success('Producto creado'); this.dialogVisible.set(false); this.loadProducts(); },
        error: () => this.notification.error('Error al crear producto'),
      });
    }
  }

  protected confirmDelete(product: Product): void {
    this.confirm.confirm({
      message: `Eliminar el producto "${product.name}"?`,
      header: 'Confirmar eliminacion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      accept: () => {
        this.productService.delete(product.id).subscribe({
          next: () => { this.notification.success('Producto eliminado'); this.loadProducts(); },
          error: () => this.notification.error('Error al eliminar producto'),
        });
      },
    });
  }

  protected getStoreName(id: number): string {
    return this.stores().find((s) => s.id === id)?.name ?? '-';
  }

  protected getCategoryName(id: number): string {
    return this.categories().find((c) => c.id === id)?.description ?? '-';
  }
}
