import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Articles } from '../../services/articles/articles';
import { Carrousel } from '../../services/carrousel/carrousel';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
  imports: [CommonModule, RouterModule, DatePipe]
})
export class Accueil implements OnInit {
  articles: any[] = [];
  carrouselPartenaires: any[] = [];

  constructor(
    private articlesService: Articles,
    private carrouselService: Carrousel
  ) {}

  ngOnInit() {
    this.articlesService.getArticles().subscribe((data: any[]) => {
      this.articles = data;
    });
    this.carrouselService.getPartenaires().subscribe((data: any[]) => {
      this.carrouselPartenaires = data;
    });
  }
}