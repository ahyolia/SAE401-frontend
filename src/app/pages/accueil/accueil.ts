import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Articles } from '../../services/articles/articles';
import { Carrousel } from '../../services/carrousel/carrousel';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accueil',
  standalone: true,
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
  imports: [CommonModule, RouterModule, DatePipe, NgbCarouselModule]
})
export class Accueil implements OnInit {
  articles: any[] = [];
  carrouselPartenaires: any[] = [];
  groupedPartenaires: any[][] = [];

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
    infinite: true,
    centerMode: true,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

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
      this.groupedPartenaires = this.chunkArray(data, 3);
    });
  }

  chunkArray(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
}