import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueService, CatalogueData, Produit } from '../../services/catalogue/catalogue';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css'
})
export class CatalogueComponent {
  isUserValid = false;
  data: CatalogueData | null = null;
  loading = true;
  error: string | null = null;
  selectedCategory: string = 'all';

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
    if (categoryId === 'all') {
      this.loadCatalogue();
    } else {
      this.loading = true;
      this.catalogueService.getByCategory(Number(categoryId)).subscribe({
        next: (data: CatalogueData) => {
          this.data = data;
          this.selectedCategory = data.activeCategory;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Erreur lors du chargement de la catégorie';
          this.loading = false;
        }
      });
    }
  }

  onAddToCart(produit: Produit) {
    if (!this.isUserValid) {
      window.location.href = '/users/login';
      return;
    }
    // Ajoute au panier ici si connecté
  }
}
