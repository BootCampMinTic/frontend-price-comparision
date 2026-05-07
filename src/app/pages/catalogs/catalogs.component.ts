import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';
import { StateService } from '../../services/state.service';
import { TypeUserService } from '../../services/type-user.service';
import { CategoryProductService } from '../../services/category-product.service';
import { CategoryStoreService } from '../../services/category-store.service';
import { PageHeader } from '../../shared/page-header.component';
import { State, TypeUser, CategoryProduct, CategoryStore } from '../../models';

@Component({
  selector: 'app-catalogs',
  imports: [TableModule, CardModule, ProgressSpinnerModule, TagModule, PageHeader],
  templateUrl: './catalogs.component.html',
})
export class CatalogsComponent implements OnInit {
  private readonly stateService = inject(StateService);
  private readonly typeUserService = inject(TypeUserService);
  private readonly catProductService = inject(CategoryProductService);
  private readonly catStoreService = inject(CategoryStoreService);

  protected readonly loading = signal(true);
  protected readonly states = signal<State[]>([]);
  protected readonly typeUsers = signal<TypeUser[]>([]);
  protected readonly catProducts = signal<CategoryProduct[]>([]);
  protected readonly catStores = signal<CategoryStore[]>([]);

  ngOnInit(): void {
    let pending = 4;
    const done = () => { pending--; if (pending <= 0) this.loading.set(false); };

    this.stateService.getAll().subscribe({ next: (r) => { this.states.set(r); done(); }, error: () => done() });
    this.typeUserService.getAll().subscribe({ next: (r) => { this.typeUsers.set(r); done(); }, error: () => done() });
    this.catProductService.getAll().subscribe({ next: (r) => { this.catProducts.set(r); done(); }, error: () => done() });
    this.catStoreService.getAll().subscribe({ next: (r) => { this.catStores.set(r); done(); }, error: () => done() });
  }
}
