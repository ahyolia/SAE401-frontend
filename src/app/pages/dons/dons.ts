import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dons.html',
  styleUrl: './dons.css'
})
export class Dons {
  don = {
    produit: '',
    quantite: 1,
    categorie: ''
  };
  categories: any[] = []; // À remplir avec tes vraies catégories

  onSubmit() {
    // Ajoute ici la logique d’envoi du don à l’API
    alert('Don envoyé !');
  }

  goBack() {
    window.history.back();
  }
}
