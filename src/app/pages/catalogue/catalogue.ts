import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CatalogueService, CatalogueData, Produit } from '../../services/catalogue/catalogue';
import { HttpClient } from '@angular/common/http';
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
  isAdherent: boolean = false;
  data: CatalogueData | null = null;
  loading = true;
  error: string | null = null;
  selectedCategory: string = 'all';
  quantities: { [id: number]: number } = {};
  searchTerm: string = '';
  panier: ProduitPanier[] = [];
  message: string = '';

  constructor(
    private catalogueService: CatalogueService,
    private panierService: PanierService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.isAdherent = localStorage.getItem('adherent') === '1';
    this.loadPanier();
    this.loadCatalogue();
    this.checkAdherent();
  }

  checkAdherent() {
    this.http.get<any>('http://localhost/SAE401/api/users/edit', { withCredentials: true })
      .subscribe({
        next: res => { this.isAdherent = !!res.user?.adherent; },
        error: () => { this.isAdherent = false; }
      });
  }

  loadPanier() {
    this.panierService.getPanier().subscribe({
      next: res => {
        console.log('API panier:', res);
        this.panier = res.panier || [];
        this.syncStocks();
      },
      error: () => { this.panier = []; }
    });
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

  syncPanier() {
    localStorage.setItem('panier', JSON.stringify(this.panier));
    this.loadPanier();
  }

  onAddToCart(produit: Produit) {
    const panierItem: ProduitPanier = {
      id: produit.id,
      name: produit.name,
      image: produit.image,
      stock: produit.stock,
      quantity: this.getQuantity(produit.id)
    };

    if (!this.isAdherent) {
      this.message = "Vous devez être adhérent pour ajouter des produits au panier. ";
      this.message += `<a href='/users/pay' style='color:#187171;font-weight:bold;'>Payer l'adhésion</a>`;
      return;
    }
    if (this.jauge + panierItem.quantity > 5) {
      this.message = "Vous ne pouvez pas réserver plus de 5 produits par panier.";
      setTimeout(() => this.message = '', 5000);
      return;
    }
    // Ajoute ou met à jour l'article dans le panier local
    const existing = this.panier.find(p => p.id === panierItem.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + panierItem.quantity, panierItem.stock || 99);
    } else {
      this.panier.push(panierItem);
    }

    // Synchronise le panier avec la BDD via l'API
    this.panierService.updatePanier(this.panier).subscribe({
      next: () => {
        this.loadPanier();
        window.dispatchEvent(new Event('panierUpdated'));
      }
    });
    this.message = `${panierItem.name} ajouté au panier !`;
    setTimeout(() => this.message = '', 5000);
  }

  onSearch(event: Event) {
    event.preventDefault();
    // La recherche est gérée par filteredProduits()
  }

  filteredProduits(): Produit[] {
    if (!this.data) return [];
    let produits = this.data.produits;

    if (this.selectedCategory !== 'all') {
      produits = produits.filter(p => p.category_id.toString() === this.selectedCategory);
    }

    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      produits = produits.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term)
        )
      );
    }

    produits = produits.filter(p => p.stock > 0);

    return produits;
  }

  get jauge(): number {
    return this.panier.reduce((total, item) => total + item.quantity, 0);
  }

  supprimer(index: number) {
    this.panier.splice(index, 1);
    this.syncPanier();
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

interface ProduitPanier {
  id: number;
  name: string;
  image?: string;
  quantity: number;
  stock?: number;
  category?: string;
}
