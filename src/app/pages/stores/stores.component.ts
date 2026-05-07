import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { CategoryStoreService } from '../../services/category-store.service';
import { NotificationService } from '../../core/notification.service';
import { PageHeader } from '../../shared/page-header.component';
import { EmptyState } from '../../shared/empty-state.component';
import { Store, CreateStore, CategoryStore } from '../../models';

@Component({
  selector: 'app-stores',
  imports: [
    FormsModule, TableModule, ButtonModule, DialogModule, CardModule,
    ProgressSpinnerModule, TagModule, InputTextModule, SelectModule, PageHeader, EmptyState,
  ],
  templateUrl: './stores.component.html',
})
export class StoresComponent implements OnInit {
  private readonly storeService = inject(StoreService);
  private readonly categoryService = inject(CategoryStoreService);
  private readonly notification = inject(NotificationService);
  private readonly confirm = inject(ConfirmationService);

  protected readonly stores = signal<Store[]>([]);
  protected readonly categories = signal<CategoryStore[]>([]);
  protected readonly loading = signal(true);
  protected readonly dialogVisible = signal(false);
  protected readonly isEditing = signal(false);
  protected readonly currentId = signal<number | null>(null);

  protected form: CreateStore = { name: '', address: '', phone: '', categoryStoreId: 1 };
  protected categoryOptions: { label: string; value: number }[] = [];

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((r) => {
      this.categories.set(r);
      this.categoryOptions = r.map((c) => ({ label: c.description, value: c.id }));
    });
    this.loadStores();
  }

  protected loadStores(): void {
    this.loading.set(true);
    this.storeService.getAll(1, 100).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (r) => this.stores.set(r.data),
      error: () => this.notification.error('Error al cargar tiendas'),
    });
  }

  protected openCreate(): void {
    this.isEditing.set(false);
    this.currentId.set(null);
    this.form = { name: '', address: '', phone: '', categoryStoreId: 1 };
    this.dialogVisible.set(true);
  }

  protected openEdit(store: Store): void {
    this.isEditing.set(true);
    this.currentId.set(store.id);
    this.form = { name: store.name, address: store.address, phone: store.phone ?? '', categoryStoreId: store.categoryStoreId };
    this.dialogVisible.set(true);
  }

  protected save(): void {
    if (this.isEditing() && this.currentId()) {
      this.storeService.update(this.currentId()!, this.form).subscribe({
        next: () => { this.notification.success('Tienda actualizada'); this.dialogVisible.set(false); this.loadStores(); },
        error: () => this.notification.error('Error al actualizar tienda'),
      });
    } else {
      this.storeService.create(this.form).subscribe({
        next: () => { this.notification.success('Tienda creada'); this.dialogVisible.set(false); this.loadStores(); },
        error: () => this.notification.error('Error al crear tienda'),
      });
    }
  }

  protected confirmDelete(store: Store): void {
    this.confirm.confirm({
      message: `Eliminar la tienda "${store.name}"?`,
      header: 'Confirmar eliminacion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      accept: () => {
        this.storeService.delete(store.id).subscribe({
          next: () => { this.notification.success('Tienda eliminada'); this.loadStores(); },
          error: () => this.notification.error('Error al eliminar tienda'),
        });
      },
    });
  }

  protected getCategoryName(id: number): string {
    return this.categories().find((c) => c.id === id)?.description ?? '-';
  }
}
