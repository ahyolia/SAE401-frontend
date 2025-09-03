import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      id="btn-top"
      title="Remonter en haut"
      *ngIf="visible"
      (click)="scrollToTop()"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  `,
  styleUrl: './topbutton.css'
})
export class ScrollTopButton {
  visible = false;

  @HostListener('window:scroll')
  onScroll() {
    this.visible = window.scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
