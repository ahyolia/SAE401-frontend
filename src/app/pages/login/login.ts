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
  role: string = ''; // Ajout de la propriété role
  successMsg: string = ''; // Ajout de la propriété successMsg
  adherent: boolean = false; // Ajout de la propriété adherent

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.loading = true;
    this.http.post<any>('http://localhost/SAE401/api/users/login', {
      login: this.login,
      password: this.password
    }, { withCredentials: true })
    .subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          // Stocke le prénom et le token dans le localStorage
          localStorage.setItem('prenom', response.user?.prenom || '');
          localStorage.setItem('token', response.user?.token || '');
          window.location.href = '/'; // ou route vers la page d'accueil
        } else {
          this.errorMsg = response.message || "Nom d'utilisateur, email ou mot de passe incorrect.";
        }
      },
      error: (err) => {
        this.errorMsg = err.error?.message || "Erreur lors de la connexion";
        this.loading = false;
      }
    });
  }
}
