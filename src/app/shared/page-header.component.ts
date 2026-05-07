import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-page-header',
  imports: [ButtonModule],
  template: `
    <div class="page-header">
      <div>
        <h1>{{ title() }}</h1>
        @if (subtitle()) {
          <p style="margin: 0.25rem 0 0; color: var(--p-text-muted-color); font-size: 0.9rem;">
            {{ subtitle() }}
          </p>
        }
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <ng-content select="[extra]" />
        @if (createLabel()) {
          <p-button
            [icon]="createIcon()"
            [label]="createLabel()"
            severity="primary"
            (onClick)="create.emit()" />
        }
      </div>
    </div>
  `,
})
export class PageHeader {
  title = input.required<string>();
  subtitle = input<string>();
  createLabel = input<string>();
  createIcon = input('pi pi-plus');
  create = output();
}
