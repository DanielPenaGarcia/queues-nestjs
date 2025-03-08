import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('@pages/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('@pages/movies/movies.component').then((m) => m.MoviesComponent),
  },
  {
    path: 'buy-tickets',
    loadComponent: () =>
      import('@pages/buying-tickets/buying-tickets.component').then((m) => m.BuyingTicketsComponent),
  },
];
