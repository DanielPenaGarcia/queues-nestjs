import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('@layouts/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('@pages/sign-in/sign-in.component').then((m) => m.SignInComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('@pages/sign-up/sign-up.component').then((m) => m.SignUpComponent),
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('@layouts/common/common.component').then((m) => m.CommonComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('@pages/movies/movies.component').then((m) => m.MoviesComponent),
      },
      {
        path: 'movie/:id',
        loadComponent: () =>
          import('@pages/buying-tickets/buying-tickets.component').then((m) => m.BuyingTicketsComponent),
      }
    ]
  }
];
