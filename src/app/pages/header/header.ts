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
  isMenuOpen = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // 1) Vérifier tout de suite à l’affichage du header
    this.checkConnexion();

    // 2) Vérifier à chaque navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkConnexion();
      }
    });

    // 3) Écouter l’événement de logout pour basculer immédiatement l’UI
    window.addEventListener('user:logout', () => {
      this.isUserValid = false;
      this.userPrenom = null;
      this.panierCount = 0;
    });

    // 4) Mettre à jour le compteur du panier
    window.addEventListener('panierUpdated', () => this.updatePanierCount());
    this.updatePanierCount();
  }

  checkConnexion() {
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
          this.panierCount = panier.reduce((t: number, i: { quantity: number }) => t + i.quantity, 0);
        },
        error: () => { this.panierCount = 0; }
      });
  }

  goToAccount() { window.location.href = '/compte'; }
  goToLogin()   { window.location.href = '/login'; }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
}
