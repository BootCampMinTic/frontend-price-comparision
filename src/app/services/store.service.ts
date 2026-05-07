import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Store, CreateStore, PaginatedResponse, ApiResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  getAll(page = 1, size = 10): Observable<PaginatedResponse<Store>> {
    return this.http.get<PaginatedResponse<Store>>(`${this.base}/stores`, {
      params: new HttpParams().set('pageNumber', page).set('pageSize', size),
    });
  }

  getById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.base}/stores/${id}`);
  }

  create(data: CreateStore): Observable<ApiResponse<object>> {
    return this.http.post<ApiResponse<object>>(`${this.base}/stores`, data);
  }

  update(id: number, data: Partial<CreateStore>): Observable<ApiResponse<object>> {
    return this.http.put<ApiResponse<object>>(`${this.base}/stores/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse<object>> {
    return this.http.delete<ApiResponse<object>>(`${this.base}/stores/${id}`);
  }
}
