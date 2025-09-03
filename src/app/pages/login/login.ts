import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  login: string = '';
  password: string = '';
  errorMsg: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.loading = true;
    this.http.post<{ token: string }>(
      'http://localhost/SAE401/api/users/login',
      { login: this.login, password: this.password }
    ).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        document.cookie = `token=${response.token}; path=/`;
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
        window.location.href = redirectUrl;
        localStorage.removeItem('redirectAfterLogin');
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Erreur de connexion';
        this.loading = false;
      }
    });
  }
}
