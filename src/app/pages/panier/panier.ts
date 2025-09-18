import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ajoute cette ligne
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
  imports: [CommonModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css'
})
export class PanierComponent implements OnInit {
  panier: ProduitPanier[] = [];
  isAdherent = false;
  message = '';
  successMsg = '';
  errorMsg = '';
  loading = false;

  constructor(private panierService: PanierService, private http: HttpClient) {}

  ngOnInit() {
    this.loadPanier();
  }

  loadPanier() {
    this.panierService.getPanier().subscribe({
      next: res => {
        this.panier = res.panier || [];
      },
      error: () => {
        this.panier = [];
      }
    });
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
    this.syncPanier();
  }

  supprimer(index: number) {
    this.panier.splice(index, 1);
    this.syncPanier();
  }

  viderPanier() {
    this.panier = [];
    this.syncPanier();
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
    this.loading = true;
    this.http.post<any>('http://localhost/SAE401/api/users/payProcess', {}, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.successMsg = response.message;
            // Met à jour le statut local
            localStorage.setItem('adherent', '1');
            // Optionnel : redirige ou recharge le panier
            window.location.href = '/panier';
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

  onAddToCart(produit: ProduitPanier) {
    if (!this.isAdherent) {
      this.message = "Vous devez être adhérent pour ajouter des produits au panier. ";
      this.message += `<a href='/users/pay' style='color:#187171;font-weight:bold;'>Payer l'adhésion</a>`;
      return;
    }
    const existing = this.panier.find(p => p.id === produit.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + produit.quantity, produit.stock || 99);
    } else {
      this.panier.push({ ...produit });
    }
    this.syncPanier();
    this.message = `${produit.name} ajouté au panier !`;
    setTimeout(() => this.message = '', 5000);
  }

  // Nouvelle méthode pour synchroniser le panier en BDD
  syncPanier() {
    this.panierService.savePanier(this.panier).subscribe({
      next: () => this.loadPanier(),
      error: () => this.message = "Erreur lors de la synchronisation du panier."
    });
  }

  changeCategory(index: number, newCategory: string) {
    this.panier[index].category = newCategory;
    this.syncPanier();
  }

  get jauge(): number {
    return this.panier.reduce((total, item) => total + item.quantity, 0);
  }
}
