import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly navItems = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/stores', label: 'Tiendas', icon: '🏪' },
    { path: '/products', label: 'Productos', icon: '📦' },
    { path: '/sales', label: 'Ventas', icon: '💰' },
    { path: '/users', label: 'Usuarios', icon: '👤' },
    { path: '/clients', label: 'Clientes', icon: '🏢' },
    { path: '/catalogs', label: 'Catálogos', icon: '📋' },
  ];
}
