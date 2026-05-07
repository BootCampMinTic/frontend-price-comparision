import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { SaleService } from '../../services/sale.service';
import { ProductService } from '../../services/product.service';
import { Sale, CreateSale, Product } from '../../models';

@Component({
  selector: 'app-sales',
  imports: [FormsModule, DatePipe, MatTableModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatCardModule, MatExpansionModule, MatChipsModule],
  templateUrl: './sales.component.html',
})
export class SalesComponent implements OnInit {
  private readonly saleService = inject(SaleService);
  private readonly productService = inject(ProductService);
  readonly sales = signal<Sale[]>([]);
  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly showForm = signal(false);
  newSale: { userId: number; storeId: number; stateId: number; productIds: number[] } = { userId: 2, storeId: 1, stateId: 1, productIds: [] };
  productColumns = ['select', 'name', 'price'];

  ngOnInit() { this.loadSales(); this.productService.getAll(1, 100).subscribe((r) => this.products.set(r.data)); }
  loadSales() {
    this.loading.set(true);
    this.saleService.getAll().subscribe({ next: (r) => { this.sales.set(r.data); this.loading.set(false); }, error: () => this.loading.set(false) });
  }
  toggleProduct(id: number) {
    const idx = this.newSale.productIds.indexOf(id);
    idx >= 0 ? this.newSale.productIds.splice(idx, 1) : this.newSale.productIds.push(id);
  }
  create() {
    const dto: CreateSale = { ...this.newSale, date: new Date().toISOString() };
    this.saleService.create(dto).subscribe({
      next: () => { this.newSale = { userId: 2, storeId: 1, stateId: 1, productIds: [] }; this.showForm.set(false); this.loadSales(); },
    });
  }
}
