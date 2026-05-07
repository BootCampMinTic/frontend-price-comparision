import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Inicio',
  },
  {
    path: 'stores',
    loadComponent: () => import('./pages/stores/stores.component').then((m) => m.StoresComponent),
    title: 'Tiendas',
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component').then((m) => m.ProductsComponent),
    title: 'Productos',
  },
  {
    path: 'sales',
    loadComponent: () => import('./pages/sales/sales.component').then((m) => m.SalesComponent),
    title: 'Ventas',
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersComponent),
    title: 'Usuarios',
  },
  {
    path: 'catalogs',
    loadComponent: () => import('./pages/catalogs/catalogs.component').then((m) => m.CatalogsComponent),
    title: 'Catálogos',
  },
];
