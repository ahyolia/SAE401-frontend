import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CatalogueService, CatalogueData, Produit } from '../../services/catalogue/catalogue';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css'
})
export class Catalogue {
  isUserValid = false;
  data: CatalogueData | null = null;
  loading = true;
  error: string | null = null;
  selectedCategory: string = 'all';
  quantities: { [id: number]: number } = {};
  searchTerm: string = '';

  constructor(private catalogueService: CatalogueService) {}

  ngOnInit() {
    this.isUserValid = !!localStorage.getItem('token');
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

  onAddToCart(produit: Produit) {
    if (!this.isUserValid) {
      window.location.href = '/login';
      return;
    }
    const qty = this.getQuantity(produit.id);
    // Ajoute au panier ici si connecté, avec qty
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
