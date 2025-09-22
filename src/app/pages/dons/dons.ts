import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categories, Category } from '../../services/categories/categories';

@Component({
  selector: 'app-dons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dons.html',
  styleUrl: './dons.css'
})
export class Dons implements OnInit {
  private categoriesSvc = inject(Categories);

  don = { produit: '', quantite: 1, categorie: '' };
  categories: Category[] = [];

  ngOnInit() {
    this.categoriesSvc.getAll().subscribe({
      next: (cats) => this.categories = cats,
      error: () => this.categories = []
    });
  }

  onSubmit() { alert('Don envoyé !'); }
  goBack() { window.history.back(); }
}
