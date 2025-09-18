import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CatalogueService, CatalogueData, Produit } from '../../services/catalogue/catalogue';
import { PanierService } from '../../services/panier/panier';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css'
})
export class Catalogue implements OnInit {
  isUserValid = false;
  isAdherent = false;
  data: CatalogueData | null = null;
  loading = true;
  error: string | null = null;
  selectedCategory: string = 'all';
  quantities: { [id: number]: number } = {};
  searchTerm: string = '';
  panier: ProduitPanier[] = [];
  message: string = '';

  constructor(private catalogueService: CatalogueService, private panierService: PanierService) {}

  ngOnInit() {
    this.isUserValid = !!localStorage.getItem('token');
    this.isAdherent = localStorage.getItem('adherent') === '1';
    // Charge le panier existant
    this.panier = JSON.parse(localStorage.getItem('panier') || '[]');
    this.loadCatalogue();
  }

  loadCatalogue() {
    this.loading = true;
    this.catalogueService.getCatalogue().subscribe({
      next: (data: CatalogueData) => {
        this.data = data;
        this.selectedCategory = data.activeCategory;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Erreur lors du chargement du catalogue';
        this.loading = false;
      }
    });
  }

  filterByCategory(categoryId: string | number) {
    this.selectedCategory = categoryId === 'all' ? 'all' : categoryId.toString();
    // Ne recharge pas le catalogue, on filtre côté client
  }

  getQuantity(id: number): number {
    return this.quantities[id] ?? 1;
  }

  incrementQuantity(id: number, max: number) {
    this.quantities[id] = Math.min(this.getQuantity(id) + 1, max);
  }

  decrementQuantity(id: number) {
    this.quantities[id] = Math.max(this.getQuantity(id) - 1, 1);
  }

  onAddToCart(produit: ProduitPanier) {
    if (!this.isAdherent) {
      this.message = "Vous devez être adhérent pour ajouter des produits au panier. ";
      this.message += `<a href='/users/pay' style='color:#187171;font-weight:bold;'>Payer l'adhésion</a>`;
      return;
    }
    if (this.jauge + produit.quantity > 5) {
      this.message = "Vous ne pouvez pas réserver plus de 5 produits par panier.";
      setTimeout(() => this.message = '', 5000);
      return;
    }
    const existing = this.panier.find(p => p.id === produit.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + produit.quantity, produit.stock || 99);
      // Optionnel : mettre à jour la catégorie si elle a changé
      if (produit.category && produit.category !== existing.category) {
        existing.category = produit.category;
      }
    } else {
      this.panier.push({ ...produit });
    }
    this.syncPanier();
    this.message = `${produit.name} ajouté au panier !`;
    setTimeout(() => this.message = '', 5000);
  }

  onSearch(event: Event) {
    event.preventDefault();
    // La recherche est gérée par filteredProduits()
  }

  filteredProduits(): Produit[] {
    if (!this.data) return [];
    let produits = this.data.produits;

    // Filtre par catégorie
    if (this.selectedCategory !== 'all') {
      produits = produits.filter(p => p.category_id.toString() === this.selectedCategory);
    }

    // Filtre par recherche
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      produits = produits.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term))
      );
    }

    // Filtre par stock > 0
    produits = produits.filter(p => p.stock > 0);

    return produits;
  }
}

interface ProduitPanier {
  id: number;
  name: string;
  image?: string;
  quantity: number;
  stock?: number;
  category?: string;
}
