import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header';
import { FooterComponent } from './pages/footer/footer';
import { ScrollTopButton } from './pages/topbutton/topbutton';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollTopButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
