import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../../services/user/user';

@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './compte.html',
  styleUrl: './compte.css'
})
export class Compte implements OnInit {
  user: any = {};
  reservations: any[] = [];
  dons: any[] = [];

  constructor(private http: HttpClient, public userService: User) {}

  ngOnInit() {
    this.loadHistorique();
    window.addEventListener('historiqueUpdated', () => this.loadHistorique());
  }

  loadHistorique() {
    this.http.get<any>('http://localhost/SAE401/api/users/account', { withCredentials: true })
      .subscribe({
        next: res => {
          console.log('API /users/account:', res);
          this.user = res.user;
          this.reservations = res.reservations || [];
          this.dons = res.dons || [];
        },
        error: () => { this.reservations = []; }
      });
  }

  onEdit() {
    window.location.href = '/compte/edit';
  }

  onLogout() {
    this.userService.logout();
  }

  onDeleteAccount() {
    // À adapter selon ton API
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      fetch('http://localhost/SAE401/api/users/deleteAccount', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Compte supprimé avec succès.');
          this.userService.logout();
        } else {
          alert(data.message || 'Erreur lors de la suppression du compte.');
        }
      })
      .catch(() => alert('Erreur lors de la suppression du compte.'));
    }
  }
}
