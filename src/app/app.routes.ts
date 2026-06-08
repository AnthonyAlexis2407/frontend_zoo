import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'animales',
    loadComponent: () => import('./components/animal-list/animal-list.component').then((c) => c.AnimalListComponent),
  },
  {
    path: 'animales/nuevo',
    loadComponent: () => import('./components/animal-form/animal-form.component').then((c) => c.AnimalFormComponent),
  },
  {
    path: 'animales/:id',
    loadComponent: () => import('./components/animal-detail/animal-detail.component').then((c) => c.AnimalDetailComponent),
  },
  {
    path: 'animales/:id/editar',
    loadComponent: () => import('./components/animal-form/animal-form.component').then((c) => c.AnimalFormComponent),
  },
  { path: '', redirectTo: '/animales', pathMatch: 'full' },
];
