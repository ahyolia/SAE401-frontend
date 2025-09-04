import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
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
    localStorage.removeItem('token');
    localStorage.removeItem('prenom');
    localStorage.removeItem('email');
    localStorage.removeItem('numero_etudiant');
    localStorage.removeItem('adherent');
    window.location.href = '/login';
  }
}
