import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Articles {
  private apiUrl = environment.apiConfig.apiUrl;

  constructor(private http: HttpClient) {}

  getArticles() {
    return this.http.get<any[]>(`${this.apiUrl}/articles`);
  }

  getArticleBySlug(slug: string) {
    return this.http.get(`${this.apiUrl}/articles/${slug}`);
  }
}
