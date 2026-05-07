import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { Store, CreateStore } from '../../models';

@Component({
  selector: 'app-stores',
  imports: [FormsModule],
  templateUrl: './stores.component.html',
})
export class StoresComponent implements OnInit {
  private readonly service = inject(StoreService);
  readonly stores = signal<Store[]>([]);
  readonly loading = signal(true);
  readonly showForm = signal(false);

  newStore: CreateStore = { name: '', address: '', phone: '', categoryStoreId: 1 };

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: (r) => { this.stores.set(r.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  create() {
    this.service.create(this.newStore).subscribe({
      next: () => { this.newStore = { name: '', address: '', phone: '', categoryStoreId: 1 }; this.showForm.set(false); this.loadStores(); },
    });
  }
}
