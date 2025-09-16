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
export class HeaderComponent {
  isUserValid: boolean = false;
  userPrenom: string | null = null;

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
    this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
      .subscribe({
        next: res => {
          // Session OK, rien à faire
        },
        error: err => {
          if (err.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('prenom');
            localStorage.removeItem('email');
            localStorage.removeItem('numero_etudiant');
            localStorage.removeItem('adherent');
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
}
