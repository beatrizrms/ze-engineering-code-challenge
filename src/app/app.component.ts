import { Component, OnInit } from '@angular/core';
import { LoadingService } from './components/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'ze-engineering-code-challenge';
  
  constructor(private loadingService: LoadingService) { }

  showLoading : boolean = false;

  ngOnInit() {
    // Control when loading show/hide
    this.loadingService.isLoading().subscribe((loading : boolean) => {
      this.showLoading = loading;
    });
  }
}
