import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('../../_components/general/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('../../_components/general/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
