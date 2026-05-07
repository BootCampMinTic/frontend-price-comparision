import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empty-state',
  imports: [ButtonModule],
  template: `
    <div class="empty-state">
      <i [class]="icon()" [style.font-size]="'3rem'" [style.margin-bottom]="'1rem'"></i>
      <h2>{{ title() }}</h2>
      @if (description()) {
        <p>{{ description() }}</p>
      }
      @if (actionLabel()) {
        <p-button
          [label]="actionLabel()"
          [icon]="actionIcon()"
          severity="primary"
          (onClick)="action.emit()" />
      }
    </div>
  `,
})
export class EmptyState {
  icon = input('pi pi-inbox');
  title = input('Sin datos');
  description = input<string>();
  actionLabel = input<string>();
  actionIcon = input('pi pi-plus');
  action = output();
}
