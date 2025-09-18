import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private apiUrl = environment.apiConfig.apiUrl;

  constructor(private http: HttpClient) {}

  getPanier() {
    return this.http.get<any>(`${this.apiUrl}/panier`, { withCredentials: true });
  }

  savePanier(panier: any) {
    return this.http.post<any>(`${this.apiUrl}/panier`, panier, { withCredentials: true });
  }

  updatePanier(panier: any) {
    return this.http.put<any>(`${this.apiUrl}/panier`, panier, { withCredentials: true });
  }

  deletePanier() {
    return this.http.delete<any>(`${this.apiUrl}/panier`, { withCredentials: true });
  }
}
