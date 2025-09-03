import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Apropos } from './pages/apropos/apropos';
import { Catalogue } from './pages/catalogue/catalogue';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'apropos', component: Apropos },
  { path: 'catalogue', component: Catalogue },
  { path: 'users/login', component: Login },
  // ...autres routes...
];
