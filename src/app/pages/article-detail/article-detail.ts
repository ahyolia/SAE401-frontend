import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Articles } from '../../services/articles/articles';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.css'
})
export class ArticleDetail {
  article: any;
  loading = true;
  errorMsg = '';

  constructor(private route: ActivatedRoute, private articlesService: Articles) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.articlesService.getArticleBySlug(slug).subscribe({
        next: (data: any) => {
          this.article = data;
          this.loading = false;
        },
        error: () => {
          this.errorMsg = "Impossible de charger l'article.";
          this.loading = false;
        }
      });
    } else {
      this.errorMsg = "Article introuvable.";
      this.loading = false;
    }
  }
}
