import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'queues',
    pathMatch: 'full',
  },
  {
    path: 'queues/register',
    loadComponent: ()=> import('./pages/create-queue/create-queue.component').then(m => m.CreateQueueComponent),
  },
  {
    path: 'queues',
    loadComponent: ()=> import('./pages/take-turn/take-turn.component').then(m => m.TakeTurnComponent),
  },
  {
    path: 'queues/:id/tickets',
    loadComponent: ()=> import('./pages/buying-tickets/buying-tickets.component').then(m => m.BuyingTicketsComponent),
  }
];
