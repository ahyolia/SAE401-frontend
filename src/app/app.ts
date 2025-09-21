import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from './pages/header/header';
import { FooterComponent } from './pages/footer/footer';
import { ScrollTopButton } from './pages/topbutton/topbutton';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, FooterComponent, ScrollTopButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  errorMsg: string | null = null;
  isAdherent: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Affiche le message d'expiration de session si présent
    const expiredMsg = localStorage.getItem('sessionExpired');
    if (expiredMsg) {
      this.errorMsg = expiredMsg;
      localStorage.removeItem('sessionExpired');
    }

    // Vérifie la validité du token à chaque navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
          .subscribe({
            next: res => {},
            error: err => {
              if (err.status === 401) {
                localStorage.clear();
                localStorage.setItem('sessionExpired', 'Votre session a expiré. Veuillez vous reconnecter.');
                window.location.reload();
              }
            }
          });
      }
    });
  }

  checkAdherent() {
    this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
      .subscribe({
        next: (res: any) => { this.isAdherent = !!res.user?.adherent; },
        error: () => { this.isAdherent = false; }
      });
  }
}
