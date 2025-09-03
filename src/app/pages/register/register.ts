import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  role: string = '';
  numero_etudiant: string = '';
  nom: string = '';
  prenom: string = '';
  email_etudiant: string = '';
  password_etudiant: string = '';
  adherent: boolean = false;

  nom_particulier: string = '';
  prenom_particulier: string = '';
  email_particulier: string = '';
  password_particulier: string = '';

  errorMsg: string = '';
  successMsg: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  onRoleChange(value: string) {
    this.role = value;
  }

  onSubmit() {
    this.loading = true;
    let data: any = { role: this.role };
    if (this.role === 'etudiant') {
      data = {
        ...data,
        numero_etudiant: this.numero_etudiant,
        nom: this.nom,
        prenom: this.prenom,
        email_etudiant: this.email_etudiant,
        password: this.password_etudiant,
        adherent: this.adherent ? 1 : 0
      };
    } else if (this.role === 'particulier') {
      data = {
        ...data,
        nom_particulier: this.nom_particulier,
        prenom_particulier: this.prenom_particulier,
        email_particulier: this.email_particulier,
        password: this.password_particulier
      };
    }
    this.http.post<any>('http://localhost/SAE401/api/users/register', data)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.successMsg = response.message || 'Inscription réussie.';
            setTimeout(() => window.location.href = '/users/login', 1500);
          } else {
            this.errorMsg = response.message || 'Erreur lors de l’inscription.';
          }
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Erreur lors de l’inscription.';
          this.loading = false;
        }
      });
  }
}
