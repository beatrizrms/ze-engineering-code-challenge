import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "home",
    loadChildren: ()=> import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: "products",
    loadChildren: ()=> import('./modules/product-list/product-list.module').then(m => m.ProductListModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
