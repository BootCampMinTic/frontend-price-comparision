import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Client,
  CreateNaturalClient,
  CreateLegalClient,
  PaginatedResponse,
  ApiResponse,
} from '../models';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  getAllNatural(page = 1, size = 10): Observable<PaginatedResponse<Client>> {
    return this.http.get<PaginatedResponse<Client>>(`${this.base}/client/natural`, {
      params: new HttpParams().set('pageNumber', page).set('pageSize', size),
    });
  }

  getNaturalById(id: number): Observable<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`${this.base}/client/natural/${id}`);
  }

  getNaturalByDocument(document: string): Observable<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`${this.base}/client/natural/${document}/document-number`);
  }

  createNatural(data: CreateNaturalClient): Observable<ApiResponse<object>> {
    return this.http.post<ApiResponse<object>>(`${this.base}/client/natural`, data);
  }

  getAllLegal(page = 1, size = 10): Observable<PaginatedResponse<Client>> {
    return this.http.get<PaginatedResponse<Client>>(`${this.base}/client/legal`, {
      params: new HttpParams().set('pageNumber', page).set('pageSize', size),
    });
  }

  getLegalById(id: number): Observable<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`${this.base}/client/legal/${id}`);
  }

  getLegalByDocument(document: string): Observable<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`${this.base}/client/legal/${document}/document-number`);
  }

  createLegal(data: CreateLegalClient): Observable<ApiResponse<object>> {
    return this.http.post<ApiResponse<object>>(`${this.base}/client/legal`, data);
  }

  getDocumentTypes(): Observable<any> {
    return this.http.get<any>(`${this.base}/client/document-type`);
  }
}
