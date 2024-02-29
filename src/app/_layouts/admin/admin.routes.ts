import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../_components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
];
