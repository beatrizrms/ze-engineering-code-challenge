import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListRoutingModule } from './product-list.routing';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    ProductListRoutingModule,
    CommonModule,
    FormsModule,
    SharedComponentsModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductListModule { }
