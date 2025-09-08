import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '../../services/user/user';


@Component({
  selector: 'app-compte',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './compte.html',
  styleUrl: './compte.css'
})
export class Compte {
  user: any;
  reservations: any[] = [];
  dons: any[] = [];

  constructor(private userService: User) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    // this.reservations = this.userService.getReservations();
    // this.dons = this.userService.getDons();
  }

  onEdit() {
    window.location.href = '/account/edit';
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
