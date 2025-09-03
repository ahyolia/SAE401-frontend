import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../interfaces/config.interface';
import { API_CONFIG } from '../../app.tokens';
import { Observable } from 'rxjs';

export interface Produit {
  id: number;
  name: string;
  description: string;
  stock: number;
  category_id: number;
  image?: string;
  price?: number;
}

@Injectable({ providedIn: 'root' })
export class ProduitsService {
  private api = inject<ApiConfig>(API_CONFIG);

  constructor(private http: HttpClient) {}

  // GET - Récupérer tous les produits
  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.api.apiUrl}/produits`);
  }

  // GET - Récupérer un produit par son ID
  getById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.api.apiUrl}/produits/${id}`);
  }

  // POST - Ajouter un produit
  create(produit: Partial<Produit>): Observable<any> {
    return this.http.post(`${this.api.apiUrl}/produits`, produit);
  }

  // PUT - Modifier un produit
  update(id: number, produit: Partial<Produit>): Observable<any> {
    return this.http.put(`${this.api.apiUrl}/produits/${id}`, produit);
  }

  // DELETE - Supprimer un produit
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api.apiUrl}/produits/${id}`);
  }
}
