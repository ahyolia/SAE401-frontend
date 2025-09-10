import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pay.html',
  styleUrl: './pay.css'
})
export class Pay {
  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(private http: HttpClient) {}

  payerAdhesion() {
    this.loading = true;
    this.http.post<any>('http://localhost/SAE401/api/users/payProcess', {})
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.successMsg = response.message;
          } else {
            this.errorMsg = response.message || 'Erreur lors du paiement.';
          }
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Erreur lors du paiement.';
          this.loading = false;
        }
      });
  }
}
