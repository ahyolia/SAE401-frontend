import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private http: HttpClient) {}

  onSubmit(credentials: { email: string; password: string }) {
    this.http.post<{ token: string }>('http://localhost/SAE401/api/users/login', credentials)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          document.cookie = `token=${response.token}; path=/`;
          // Redirection ou autre action après login
        },
        error: (err) => {
          // Gestion des erreurs
        }
      });
  }
}
