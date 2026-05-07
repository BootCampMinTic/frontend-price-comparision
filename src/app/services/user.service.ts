import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, CreateUser, ApiResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}/users`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.base}/users/${id}`);
  }

  create(data: CreateUser): Observable<ApiResponse<object>> {
    return this.http.post<ApiResponse<object>>(`${this.base}/users`, data);
  }
}
