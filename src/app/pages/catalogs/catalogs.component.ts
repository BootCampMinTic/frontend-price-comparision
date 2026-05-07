import { Component, inject, signal, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { TypeUserService } from '../../services/type-user.service';
import { CategoryProductService } from '../../services/category-product.service';
import { CategoryStoreService } from '../../services/category-store.service';
import { DocumentTypeService } from '../../services/document-type.service';
import { State, TypeUser, CategoryProduct, CategoryStore } from '../../models';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
})
export class CatalogsComponent implements OnInit {
  private readonly stateService = inject(StateService);
  private readonly typeUserService = inject(TypeUserService);
  private readonly catProdService = inject(CategoryProductService);
  private readonly catStoreService = inject(CategoryStoreService);
  private readonly docTypeService = inject(DocumentTypeService);

  readonly states = signal<State[]>([]);
  readonly typeUsers = signal<TypeUser[]>([]);
  readonly catProducts = signal<CategoryProduct[]>([]);
  readonly catStores = signal<CategoryStore[]>([]);
  readonly docTypes = signal<any[]>([]);

  ngOnInit() {
    this.stateService.getAll().subscribe((r) => this.states.set(r));
    this.typeUserService.getAll().subscribe((r) => this.typeUsers.set(r));
    this.catProdService.getAll().subscribe((r) => this.catProducts.set(r));
    this.catStoreService.getAll().subscribe((r) => this.catStores.set(r));
    this.docTypeService.getAll().subscribe((r) => this.docTypes.set(r.data || r));
  }
}
