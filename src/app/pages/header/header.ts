import { Component } from '@angular/core';
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
export class Header {
  isUserValid = !!localStorage.getItem('token');
  userPrenom: string | null = null;
  errorMsg: string | null = null;

  constructor(private router: Router, private http: HttpClient) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Force la mise à jour
        this.isUserValid = !!localStorage.getItem('token');
        this.userPrenom = localStorage.getItem('prenom');
      }
    });
  }

  ngOnInit() {
    const expiredMsg = localStorage.getItem('sessionExpired');
    if (expiredMsg) {
      this.errorMsg = expiredMsg;
      localStorage.removeItem('sessionExpired');
    }

    this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
      .subscribe({
        next: res => {},
        error: err => {
          if (err.status === 401) {
            localStorage.clear();
            window.location.reload();
          }
        }
      });
  }

  goToAccount() {
    window.location.href = '/compte';
  }
  goToLogin() {
    window.location.href = '/login';
  }

  get panierCount(): number {
    const panier: { quantity: number }[] = JSON.parse(localStorage.getItem('panier') || '[]');
    return panier.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
  }
}
