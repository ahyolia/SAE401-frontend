import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  isUserValid = false;
  userPrenom: string | null = null;

  ngOnInit() {
    this.isUserValid = !!localStorage.getItem('token');
    this.userPrenom = localStorage.getItem('prenom');
  }

  goToAccount() {
    window.location.href = '/compte';
  }
  goToLogin() {
    window.location.href = '/login';
  }
}
