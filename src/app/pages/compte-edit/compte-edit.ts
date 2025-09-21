import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compte-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compte-edit.html',
  styleUrl: './compte-edit.css'
})
export class CompteEdit {
  user: any = {};
  prenom = '';
  email = '';
  password = '';
  adherent = false;
  successMsg = '';
  errorMsg = '';
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Récupère les infos utilisateur depuis l'API ou le localStorage
    this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
      .subscribe({
        next: res => {
          this.user = res.user;
          this.prenom = res.user.prenom;
          this.email = res.user.email;
          this.adherent = !!res.user.adherent;
        },
        error: () => {
          this.errorMsg = "Erreur lors du chargement du profil.";
        }
      });
  }

  onSubmit() {
    this.loading = true;
    this.http.post<any>('http://localhost/SAE401/api/users/update', {
      prenom: this.prenom,
      email: this.email,
      password: this.password // peut être vide si non changé
    }, { withCredentials: true }).subscribe({
      next: res => {
        this.successMsg = res.message || "Profil mis à jour.";
        this.errorMsg = '';
        this.loading = false;
      },
      error: err => {
        this.errorMsg = err.error?.message || "Erreur lors de la mise à jour.";
        this.successMsg = '';
        this.loading = false;
      }
    });
  }

  payerAdhesion() {
    window.location.href = '/users/pay';
  }

  goBack() {
    window.history.back();
  }
}
