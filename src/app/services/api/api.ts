import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getCatalogue() {
    return this.http.get(`${environment.apiConfig.apiUrl}/catalogue`, { withCredentials: true });
  }
  // Ajoute d’autres méthodes pour chaque ressource

  authReq(req: any, token: string) {
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      },
      withCredentials: true
    });
  }
}
