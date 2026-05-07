import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly navItems = [
    { path: '/', label: 'Dashboard', icon: 'dashboard' },
    { path: '/stores', label: 'Tiendas', icon: 'store' },
    { path: '/products', label: 'Productos', icon: 'inventory_2' },
    { path: '/sales', label: 'Ventas', icon: 'receipt_long' },
    { path: '/users', label: 'Usuarios', icon: 'people' },
    { path: '/clients', label: 'Clientes', icon: 'business' },
    { path: '/catalogs', label: 'Catálogos', icon: 'category' },
  ];
}
