import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly storeService = inject(StoreService);
  private readonly productService = inject(ProductService);
  private readonly saleService = inject(SaleService);
  private readonly userService = inject(UserService);
  readonly stores = signal(0);
  readonly products = signal(0);
  readonly sales = signal(0);
  readonly users = signal(0);

  ngOnInit() {
    this.storeService.getAll(1, 1).subscribe(r => this.stores.set(r.data.length));
    this.productService.getAll(1, 1).subscribe(r => this.products.set(r.data.length));
    this.saleService.getAll(1, 1).subscribe(r => this.sales.set(r.data.length));
    this.userService.getAll().subscribe(r => this.users.set(r.length));
  }
}
