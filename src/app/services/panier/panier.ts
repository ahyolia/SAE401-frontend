import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../catalogue/catalogue';

export interface ProduitPanier {
  id: number;
  name: string;
  image?: string;
  quantity: number;
  stock?: number;
  category?: string;
}

@Injectable({ providedIn: 'root' })
export class PanierService {
  private apiUrl = 'http://localhost/SAE401/api/panier';

  constructor(private http: HttpClient) {}

  getPanier() {
    return this.http.get<any>('http://localhost/SAE401/api/panier', { withCredentials: true });
  }

  savePanier(panier: ProduitPanier[]) {
    return this.http.post<any>(this.apiUrl, panier, { withCredentials: true });
  }

  updatePanier(panier: ProduitPanier[]) {
    return this.http.put<any>(this.apiUrl, panier, { withCredentials: true });
  }

  deletePanier() {
    return this.http.delete<any>(this.apiUrl, { withCredentials: true });
  }

}
