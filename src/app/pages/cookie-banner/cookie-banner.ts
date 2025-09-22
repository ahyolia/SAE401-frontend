import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css'
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;

  ngOnInit() {
    if (!localStorage.getItem('cookie_consent')) {
      this.showBanner = true;
      document.body.classList.add('cookie-banner-visible');
    }
  }

  accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    this.showBanner = false;
    document.body.classList.remove('cookie-banner-visible');
  }

  refuse() {
    localStorage.setItem('cookie_consent', 'refused');
    this.showBanner = false;
    document.body.classList.remove('cookie-banner-visible');
  }
}
