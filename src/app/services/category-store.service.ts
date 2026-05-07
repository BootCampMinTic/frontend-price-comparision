import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoryStore, CreateCategoryStore, ApiResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class CategoryStoreService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  getAll(): Observable<CategoryStore[]> {
    return this.http.get<CategoryStore[]>(`${this.base}/category-stores`);
  }

  getById(id: number): Observable<CategoryStore> {
    return this.http.get<CategoryStore>(`${this.base}/category-stores/${id}`);
  }

  create(data: CreateCategoryStore): Observable<ApiResponse<object>> {
    return this.http.post<ApiResponse<object>>(`${this.base}/category-stores`, data);
  }

  update(id: number, data: Partial<CreateCategoryStore>): Observable<ApiResponse<object>> {
    return this.http.put<ApiResponse<object>>(`${this.base}/category-stores/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse<object>> {
    return this.http.delete<ApiResponse<object>>(`${this.base}/category-stores/${id}`);
  }
}
