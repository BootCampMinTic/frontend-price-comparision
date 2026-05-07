import { Injectable, inject, signal, computed } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _mode = signal<ThemeMode>(this.getInitialTheme());

  readonly mode = this._mode.asReadonly();
  readonly isDark = computed(() => this._mode() === 'dark');
  readonly icon = computed(() => (this.isDark() ? 'pi pi-moon' : 'pi pi-sun'));
  readonly label = computed(() => (this.isDark() ? 'Modo oscuro' : 'Modo claro'));

  toggle(): void {
    const next = this._mode() === 'light' ? 'dark' : 'light';
    this._mode.set(next);
    this.applyTheme(next);
  }

  set(mode: ThemeMode): void {
    this._mode.set(mode);
    this.applyTheme(mode);
  }

  private applyTheme(mode: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.classList.toggle('p-dark', mode === 'dark');
    localStorage.setItem('theme', mode);
  }

  private getInitialTheme(): ThemeMode {
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    if (stored) {
      this.applyTheme(stored);
      return stored;
    }
    this.applyTheme('light');
    return 'light';
  }
}
