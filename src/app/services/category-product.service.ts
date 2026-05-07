import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoryProduct, CreateCategoryProduct, ApiResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class CategoryProductService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  getAll(): Observable<CategoryProduct[]> {
    return this.http.get<CategoryProduct[]>(`${this.base}/category-products`);
  }

  getById(id: number): Observable<CategoryProduct> {
    return this.http.get<CategoryProduct>(`${this.base}/category-products/${id}`);
  }

  create(data: CreateCategoryProduct): Observable<ApiResponse<object>> {
    return this.http.post<ApiResponse<object>>(`${this.base}/category-products`, data);
  }
}
