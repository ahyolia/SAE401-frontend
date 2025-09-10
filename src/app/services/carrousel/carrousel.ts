import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Carrousel {
  private apiUrl = environment.apiConfig.apiUrl;

  constructor(private http: HttpClient) {}

  getPartenaires() {
    return this.http.get<any[]>(`${this.apiUrl}/carrousel`);
  }
}
