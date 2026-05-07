import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DocumentTypeService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}`;

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.base}/client/document-type`);
  }
}
