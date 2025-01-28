import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PublicacionPage } from './Paginas/publicacion/publicacion.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'publicacion',
    loadComponent: () => import('./Paginas/publicacion/publicacion.page').then( m => m.PublicacionPage)
  },
];
