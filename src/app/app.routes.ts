import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./_layouts/general/general.component').then(m => m.GeneralComponent),
    loadChildren: () => import('./_layouts/general/general.routes').then(m => m.routes)
  },
  {
    path: 'admin',
    loadComponent: () => import('./_layouts/admin/admin.component').then(m => m.AdminComponent),
    loadChildren: () => import('./_layouts/admin/admin.routes').then(m => m.routes)
  }
];
