import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot.html',
  styleUrl: './forgot.css'
})
export class Forgot {
  email: string = '';
  message: string = '';
  error: string = '';
  loading = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.loading = true;
    this.http.post<any>('http://localhost/SAE401/api/users/forgot', { email: this.email })
      .subscribe({
        next: res => {
          this.message = res.message || 'Un email de réinitialisation a été envoyé si ce compte existe.';
          this.error = '';
          this.loading = false;
        },
        error: err => {
          this.error = err.error?.message || 'Erreur lors de la demande.';
          this.message = '';
          this.loading = false;
        }
      });
  }
}
