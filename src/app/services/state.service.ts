import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { State } from '../models';

@Injectable({ providedIn: 'root' })
export class StateService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  getAll(): Observable<State[]> {
    return this.http.get<State[]>(`${this.base}/states`);
  }
}
