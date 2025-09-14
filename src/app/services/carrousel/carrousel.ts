import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Carrousel {
  constructor(private http: HttpClient) {}

  getPartenaires(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost/SAE401/api/carrousel');
  }
}
