import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from './pages/header/header';
import { FooterComponent } from './pages/footer/footer';
import { ScrollTopButton } from './pages/topbutton/topbutton';
import { HttpClient } from '@angular/common/http';
import { CookieBannerComponent } from './pages/cookie-banner/cookie-banner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, FooterComponent, ScrollTopButton, CookieBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  errorMsg: string | null = null;
  isAdherent: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ne contrôle la session que pour les pages protégées
        if (!this.isProtected(event.urlAfterRedirects)) return;

        this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
          .subscribe({
            next: () => {},
            error: err => {
              if (err.status === 401) {
                // Nettoyage ciblé des infos d’auth
                localStorage.removeItem('token');
                localStorage.removeItem('prenom');
                localStorage.removeItem('adherent');

                // Notifie immédiatement le header
                window.dispatchEvent(new Event('user:logout'));

                // Bandeau d’info
                this.errorMsg = "Votre session a expiré. Veuillez vous reconnecter.";
                setTimeout(() => this.errorMsg = null, 5000);

                // Redirige vers /login uniquement si on était sur une page protégée
                if (this.isProtected(event.urlAfterRedirects) && event.urlAfterRedirects !== '/login') {
                  this.router.navigateByUrl('/login');
                }
              }
            }
          });
      }
    });
  }

  // Pages qui nécessitent d’être connecté
  private isProtected(url: string): boolean {
    const path = url.split('?')[0];
    const protectedPrefixes = ['/compte', '/compte/edit', '/panier', '/users/pay', '/dons', '/benevoles'];
    return protectedPrefixes.some(p => path.startsWith(p));
  }

  checkAdherent() {
    this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
      .subscribe({
        next: (res: any) => { this.isAdherent = !!res.user?.adherent; },
        error: () => { this.isAdherent = false; }
      });
  }
}
