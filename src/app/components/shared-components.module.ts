import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent,
    LoadingComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule
    
  ],
  exports: [
    HeaderComponent, 
    FooterComponent,
    LoadingComponent,
    FeedbackComponent
  ]
})
export class SharedComponentsModule { }
 