import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';
import { Product, CreateProduct, Store } from '../../models';

@Component({
  selector: 'app-products',
  imports: [FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly storeService = inject(StoreService);
  readonly products = signal<Product[]>([]);
  readonly stores = signal<Store[]>([]);
  readonly loading = signal(true);
  readonly showForm = signal(false);
  readonly filterStoreId = signal(0);
  newProduct: CreateProduct = { name: '', price: 0, storeId: 1, categoryProductId: 1 };

  ngOnInit() { this.loadProducts(); this.storeService.getAll(1,100).subscribe(r => this.stores.set(r.data)); }
  loadProducts() {
    this.loading.set(true);
    const req = this.filterStoreId() > 0 ? this.productService.getByStore(this.filterStoreId(),1,100) : this.productService.getAll(1,100);
    req.subscribe({ next: r => { this.products.set(r.data); this.loading.set(false); }, error: () => this.loading.set(false) });
  }
  create() {
    this.productService.create(this.newProduct).subscribe({
      next: () => { this.newProduct = { name: '', price: 0, storeId: 1, categoryProductId: 1 }; this.showForm.set(false); this.loadProducts(); },
    });
  }
}
