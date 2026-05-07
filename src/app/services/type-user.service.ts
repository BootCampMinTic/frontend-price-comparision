import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TypeUser } from '../models';

@Injectable({ providedIn: 'root' })
export class TypeUserService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  getAll(): Observable<TypeUser[]> {
    return this.http.get<TypeUser[]>(`${this.base}/type-users`);
  }
}
