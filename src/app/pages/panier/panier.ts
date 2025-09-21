import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PanierService } from '../../services/panier/panier';

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
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css'
})
export class PanierComponent implements OnInit {
  panier: ProduitPanier[] = [];
  isAdherent: boolean = false;
  message: string = '';
  successMsg: string = '';
  errorMsg: string = '';
  loading: boolean = false;

  constructor(private panierService: PanierService, private http: HttpClient) {}

  ngOnInit() {
    // Charge le panier et le statut adhérent
    this.loadPanier();
    this.checkAdherent(); // Vérifie le statut en BDD à chaque affichage
  }

  checkAdherent() {
    this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
      .subscribe({
        next: res => {
          this.isAdherent = !!res.user?.adherent;
          localStorage.setItem('adherent', this.isAdherent ? '1' : '0');
        },
        error: () => {
          this.isAdherent = false;
          localStorage.setItem('adherent', '0');
        }
      });
  }

  loadPanier() {
    this.panierService.getPanier().subscribe({
      next: res => {
        this.panier = res.panier || [];
        this.syncStocks();
      },
      error: () => { this.panier = []; }
    });
  }

  addToPanier(produit: ProduitPanier) {
    const existing = this.panier.find(p => p.id === produit.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + produit.quantity, produit.stock || 99);
    } else {
      this.panier.push({ ...produit });
    }
    this.panierService.savePanier(this.panier).subscribe({
      next: () => this.loadPanier()
    });
  }

  plus(index: number) {
    if (this.jauge >= 5) {
      this.message = "Vous ne pouvez pas réserver plus de 5 produits par panier.";
      return;
    }
    const produit = this.panier[index];
    if (produit.stock && produit.quantity >= produit.stock) return;
    produit.quantity += 1;
    this.syncPanier();
  }

  minus(index: number) {
    if (this.panier[index].quantity > 1) {
      this.panier[index].quantity -= 1;
      this.syncPanier();
    }
  }

  updateQuantity(index: number, value: number) {
    const produit = this.panier[index];
    if (value < 1) return;
    if (produit.stock && value > produit.stock) value = produit.stock;
    this.panier[index].quantity = value;
    // Synchronise avec l'API REST
    this.panierService.updatePanier(this.panier).subscribe({
      next: () => this.loadPanier()
    });
  }

  supprimer(index: number) {
    this.panier.splice(index, 1);
    // Synchronise avec l'API REST
    this.panierService.updatePanier(this.panier).subscribe({
      next: () => this.loadPanier()
    });
  }

  viderPanier() {
    this.panierService.deletePanier().subscribe({
      next: () => this.loadPanier()
    });
  }

  validerPanier() {
    this.message = "Votre commande a été validée ! (simulation locale)";
    this.viderPanier();
    setTimeout(() => this.message = '', 4000);
  }

  payerAdhesion() {
    window.location.href = '/users/pay';
  }

  get jauge(): number {
    return this.panier.reduce((total, item) => total + item.quantity, 0);
  }

  syncPanier() {
    localStorage.setItem('panier', JSON.stringify(this.panier));
    this.loadPanier();
  }

  syncStocks() {
    this.http.post<{ [id: number]: number }>('http://localhost/SAE401/panier/stocks', this.panier, { withCredentials: true })
      .subscribe(stocks => {
        this.panier.forEach(p => {
          if (typeof stocks[p.id] !== 'undefined') {
            p.stock = stocks[p.id];
            if (p.quantity > p.stock) p.quantity = p.stock;
          }
        });
      });
  }
}
