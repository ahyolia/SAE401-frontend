import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset.html',
  styleUrl: './reset.css'
})
export class Reset {
  password: string = '';
  confirm: string = '';
  message: string = '';
  error: string = '';
  loading = false;
  token: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    if (!this.password || !this.confirm) {
      this.error = 'Veuillez remplir les deux champs.';
      return;
    }
    if (this.password !== this.confirm) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }
    this.loading = true;
    this.http.post<any>('http://localhost/SAE401/api/users/reset', {
      token: this.token,
      password: this.password
    }).subscribe({
      next: res => {
        this.message = res.message || 'Mot de passe réinitialisé avec succès.';
        this.error = '';
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || 'Erreur lors de la réinitialisation.';
        this.message = '';
        this.loading = false;
      }
    });
  }
}
