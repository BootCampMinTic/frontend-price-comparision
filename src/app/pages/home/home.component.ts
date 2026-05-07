import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';
import { UserService } from '../../services/user.service';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterModule, CardModule, SkeletonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly storeService = inject(StoreService);
  private readonly productService = inject(ProductService);
  private readonly saleService = inject(SaleService);
  private readonly userService = inject(UserService);

  protected readonly loading = signal(true);

  protected readonly stats = signal<StatCard[]>([
    { label: 'Tiendas', value: '0', icon: 'pi pi-shop', route: '/stores', color: 'var(--p-blue-500)' },
    { label: 'Productos', value: '0', icon: 'pi pi-box', route: '/products', color: 'var(--p-green-500)' },
    { label: 'Ventas', value: '0', icon: 'pi pi-dollar', route: '/sales', color: 'var(--p-orange-500)' },
    { label: 'Usuarios', value: '0', icon: 'pi pi-users', route: '/users', color: 'var(--p-purple-500)' },
  ]);

  ngOnInit(): void {
    this.storeService.getAll(1, 10).subscribe((r) => this.updateStat(0, r.totalRecords));
    this.productService.getAll(1, 10).subscribe((r) => this.updateStat(1, r.totalRecords));
    this.saleService.getAll(1, 10).subscribe((r) => this.updateStat(2, r.totalRecords));
    this.userService.getAll().subscribe((r) => {
      this.updateStat(3, r.length);
      this.loading.set(false);
    });
  }

  private updateStat(index: number, count: number): void {
    this.stats.update((s) => {
      const updated = [...s];
      updated[index] = { ...updated[index], value: String(count) };
      return updated;
    });
  }
}
