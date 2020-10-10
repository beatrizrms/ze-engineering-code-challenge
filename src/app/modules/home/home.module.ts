import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

 
@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule, 
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentsModule
    ],
    exports : [
        HomeComponent
    ]
})
export class HomeModule { }