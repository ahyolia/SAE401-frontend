import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Apropos } from './pages/apropos/apropos';
import { Catalogue } from './pages/catalogue/catalogue';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ArticleDetail } from './pages/article-detail/article-detail';
import { Dons } from './pages/dons/dons';
import { Benevoles } from './pages/benevoles/benevoles';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'apropos', component: Apropos },
  { path: 'catalogue', component: Catalogue },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'articles/lire/:slug', component: ArticleDetail },
  { path: 'dons', component: Dons },
  { path: 'benevoles', component: Benevoles },
  { path: '**', component: NotFound }
];
