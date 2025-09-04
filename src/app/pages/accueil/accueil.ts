import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Articles } from '../../services/articles/articles';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  articles: any[] = [];

  constructor(private articlesService: Articles) {}

  ngOnInit() {
    this.articlesService.getArticles().subscribe((data: any[]) => {
      this.articles = data;
    });
  }
}