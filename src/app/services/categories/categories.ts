import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../app.tokens';
import { ApiConfig } from '../../interfaces/config.interface';

export interface Category {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class Categories {
  private http = inject(HttpClient);
  private config = inject<ApiConfig>(API_CONFIG);

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.config.apiUrl}/categories`);
  }
}
