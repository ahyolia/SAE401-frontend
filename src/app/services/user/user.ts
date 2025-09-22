import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);

  getUser() {
    // Récupère l'utilisateur depuis le localStorage
    return {
      numero_etudiant: localStorage.getItem('numero_etudiant'),
      email: localStorage.getItem('email'),
      prenom: localStorage.getItem('prenom'),
      adherent: localStorage.getItem('adherent') === '1'
    };
  }

  logout() {
    this.http.post('http://localhost/SAE401/api/users/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => this.clearLocalDataAndRedirect(),
        error: () => this.clearLocalDataAndRedirect() // Fait le ménage même si l'API échoue
      });
  }

  private clearLocalDataAndRedirect() {
    // Supprime uniquement les données utilisateur, pas tout le localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('prenom');
    localStorage.removeItem('adherent');
    localStorage.removeItem('sessionExpired');
    
    // Redirige vers la page de connexion
    window.location.href = '/login';
  }
}
