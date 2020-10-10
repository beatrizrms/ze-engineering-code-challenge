import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback',
  template: `<div class="feedback" [ngClass]="type" [attr.alt]="message">
              {{message}}
            </div>`,
  styleUrls: [
    './feedback.component.scss' 
  ]
})
export class FeedbackComponent {
  @Input() message: string = "";
  @Input() type: string = "";
}
