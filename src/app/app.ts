import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar, type NavItem } from './layout/sidebar.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Sidebar, ToastModule, ConfirmDialogModule, ButtonModule, ToolbarModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly navItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: 'pi pi-chart-bar' },
    { path: '/stores', label: 'Tiendas', icon: 'pi pi-shop' },
    { path: '/products', label: 'Productos', icon: 'pi pi-box' },
    { path: '/sales', label: 'Ventas', icon: 'pi pi-dollar' },
    { path: '/users', label: 'Usuarios', icon: 'pi pi-users' },
    { path: '/catalogs', label: 'Catalogos', icon: 'pi pi-book' },
  ];

  protected sidebarOpen = false;

  protected toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
