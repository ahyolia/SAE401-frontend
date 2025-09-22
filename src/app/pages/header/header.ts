import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  isUserValid = false;
  userPrenom: string | null = null;
  panierCount: number = 0;
  isMenuOpen = false; // Ajout de la propriété pour le menu

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Vérifie la connexion à chaque changement de page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkConnexion();
      }
    });
    // Met à jour le compteur du panier
    window.addEventListener('panierUpdated', () => this.updatePanierCount());
    this.updatePanierCount();
  }

  checkConnexion() {
    // Vérifie la session côté backend
    this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
      .subscribe({
        next: res => {
          this.isUserValid = !!res.user;
          this.userPrenom = res.user?.prenom || null;
        },
        error: () => {
          this.isUserValid = false;
          this.userPrenom = null;
        }
      });
  }

  updatePanierCount() {
    this.http.get<any>('http://localhost/SAE401/api/panier', { withCredentials: true })
      .subscribe({
        next: res => {
          const panier = res.panier || [];
          this.panierCount = panier.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
        },
        error: () => { this.panierCount = 0; }
      });
  }

  goToAccount() {
    window.location.href = '/compte';
  }
  goToLogin() {
    window.location.href = '/login';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
