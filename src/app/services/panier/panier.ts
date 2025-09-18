import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private apiUrl = 'http://localhost/SAE401/api/panier';

  constructor(private http: HttpClient) {}

  getPanier() {
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }

  savePanier(panier: any) {
    return this.http.post<any>(this.apiUrl, panier, { withCredentials: true });
  }

  updatePanier(panier: any) {
    return this.http.put<any>(this.apiUrl, panier, { withCredentials: true });
  }

  deletePanier() {
    return this.http.delete<any>(this.apiUrl, { withCredentials: true });
  }
}
