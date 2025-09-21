import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../app.tokens';
import { ApiConfig } from '../../interfaces/config.interface';
import { Observable } from 'rxjs';

export interface Produit {
  id: number;
  name: string;
  description: string;
  stock: number;
  category_id: number;
  image?: string;
  price?: number;
  category_name?: string;
}

export interface CatalogueData {
  produits: Produit[];
  categories: { id: number; name: string }[];
  activeCategory: string;
}

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  private config = inject<ApiConfig>(API_CONFIG);

  constructor(private http: HttpClient) {}

  getCatalogue(): Observable<CatalogueData> {
    return this.http.get<CatalogueData>(`${this.config.apiUrl}/catalogue`);
  }

  getByCategory(categoryId: number): Observable<CatalogueData> {
    return this.http.get<CatalogueData>(`${this.config.apiUrl}/catalogue/categories/${categoryId}`);
  }

  getUserStatus() {
    return this.http.get<any>(`${this.config.apiUrl}/users/edit`, { withCredentials: true });
  }
}
