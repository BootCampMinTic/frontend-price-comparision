import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Sale, CreateSale, PaginatedResponse, ApiResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  getAll(page = 1, size = 10): Observable<PaginatedResponse<Sale>> {
    return this.http.get<PaginatedResponse<Sale>>(`${this.base}/sales`, {
      params: new HttpParams().set('pageNumber', page).set('pageSize', size),
    });
  }

  getById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.base}/sales/${id}`);
  }

  create(data: CreateSale): Observable<ApiResponse<object>> {
    return this.http.post<ApiResponse<object>>(`${this.base}/sales`, data);
  }

  update(id: number, data: Partial<CreateSale>): Observable<ApiResponse<object>> {
    return this.http.put<ApiResponse<object>>(`${this.base}/sales/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse<object>> {
    return this.http.delete<ApiResponse<object>>(`${this.base}/sales/${id}`);
  }
}
