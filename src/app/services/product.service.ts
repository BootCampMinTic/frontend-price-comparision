import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product, CreateProduct, PaginatedResponse, ApiResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  getAll(page = 1, size = 10): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>(`${this.base}/products`, {
      params: new HttpParams().set('pageNumber', page).set('pageSize', size),
    });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/products/${id}`);
  }

  getByStore(storeId: number, page = 1, size = 10): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>(`${this.base}/stores/${storeId}/products`, {
      params: new HttpParams().set('pageNumber', page).set('pageSize', size),
    });
  }

  create(data: CreateProduct): Observable<ApiResponse<object>> {
    return this.http.post<ApiResponse<object>>(`${this.base}/products`, data);
  }

  update(id: number, data: Partial<CreateProduct>): Observable<ApiResponse<object>> {
    return this.http.put<ApiResponse<object>>(`${this.base}/products/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse<object>> {
    return this.http.delete<ApiResponse<object>>(`${this.base}/products/${id}`);
  }
}
