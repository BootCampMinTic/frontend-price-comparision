import { Component, input, output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../core/theme.service';

export interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, ButtonModule],
  host: {
    class: 'app-sidebar',
    '[class.open]': 'open()',
  },
  template: `
    <div class="app-sidebar-brand">
      <i class="pi pi-bolt"></i>
      <span>Precios</span>
    </div>
    <nav class="app-sidebar-nav">
      @for (item of items(); track item.path) {
        <a
          [routerLink]="item.path"
          routerLinkActive="p-button p-button-sm w-full"
          [routerLinkActiveOptions]="{ exact: item.path === '/' }"
          class="p-button p-button-text p-button-sm w-full"
          [class.p-button-outlined]="!isActive(item.path)">
          <i [class]="item.icon" style="margin-right: 0.75rem"></i>
          {{ item.label }}
        </a>
      }
    </nav>
    <div class="app-sidebar-footer">
      <p-button
        [icon]="theme.icon()"
        severity="secondary"
        variant="text"
        size="small"
        (onClick)="theme.toggle()"
        [label]="theme.label()" />
    </div>
    <div class="app-sidebar-footer" style="border-top: none; padding-top: 0;">
      Price Comparison v2.0
    </div>
  `,
})
export class Sidebar {
  items = input.required<NavItem[]>();
  open = input(false);
  toggleSidebar = output();

  protected readonly theme = inject(ThemeService);

  protected isActive(path: string): boolean {
    return window.location.pathname === path || (path !== '/' && window.location.pathname.startsWith(path));
  }
}
