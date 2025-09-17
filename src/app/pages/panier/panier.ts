import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ProduitPanier {
  id: number;
  name: string;
  image?: string;
  quantity: number;
  stock?: number;
  category?: string;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.html',
  styleUrl: './panier.css'
})
export class PanierComponent implements OnInit {
  panier: ProduitPanier[] = [];
  isAdherent = false;
  message = '';
  jauge = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPanier();
    this.checkAdherent();
    this.majStocks();
  }

  loadPanier() {
    this.panier = JSON.parse(localStorage.getItem('panier') || '[]');
    this.jauge = this.panier.reduce((total, item) => total + item.quantity, 0);
  }

  checkAdherent() {
    this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
      .subscribe({
        next: res => this.isAdherent = !!res.user?.adherent,
        error: () => this.isAdherent = false
      });
  }

  majStocks() {
    if (this.panier.length === 0) return;
    this.http.post<any>('http://localhost/SAE401/api/panier/stocks', this.panier, { withCredentials: true })
      .subscribe(stocks => {
        this.panier.forEach(p => {
          if (typeof stocks[p.id] !== 'undefined') {
            p.stock = stocks[p.id];
            if (typeof p.stock !== 'undefined' && p.quantity > p.stock) p.quantity = p.stock;
          }
        });
        localStorage.setItem('panier', JSON.stringify(this.panier));
      });
  }

  updateQuantity(index: number, value: number) {
    const produit = this.panier[index];
    if (value < 1) return;
    if (produit.stock && value > produit.stock) value = produit.stock;
    this.panier[index].quantity = value;
    localStorage.setItem('panier', JSON.stringify(this.panier));
    this.loadPanier();
  }

  plus(index: number) {
    const produit = this.panier[index];
    if (produit.stock && produit.quantity >= produit.stock) return;
    if (this.jauge >= 5) return;
    this.panier[index].quantity += 1;
    localStorage.setItem('panier', JSON.stringify(this.panier));
    this.loadPanier();
  }

  minus(index: number) {
    if (this.panier[index].quantity > 1) {
      this.panier[index].quantity -= 1;
      localStorage.setItem('panier', JSON.stringify(this.panier));
      this.loadPanier();
    }
  }

  supprimer(index: number) {
    this.panier.splice(index, 1);
    localStorage.setItem('panier', JSON.stringify(this.panier));
    this.loadPanier();
  }

  viderPanier() {
    this.panier = [];
    localStorage.setItem('panier', JSON.stringify([]));
    this.loadPanier();
  }

  validerPanier() {
    if (this.panier.length === 0) {
      this.message = 'Votre panier est vide.';
      return;
    }
    this.http.post<any>('http://localhost/SAE401/api/panier/valider', this.panier, { withCredentials: true })
      .subscribe({
        next: res => {
          if (res.success) {
            this.message = res.message;
            this.viderPanier();
          } else {
            this.message = res.message || 'Erreur lors de la validation.';
          }
        },
        error: err => {
          this.message = err.error?.message || 'Erreur lors de la validation.';
        }
      });
  }

  payerAdhesion() {
    window.location.href = '/users/pay';
  }
}
