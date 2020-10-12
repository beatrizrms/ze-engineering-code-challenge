import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { HomeService } from './home.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { Place } from 'src/app/model/Place';
import { HomeMessages } from './home.constant';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss'
  ]
})
/**
 * HomeComponent
 * The feature of Home that user choose a address to init the shoopping flow
 */
export class HomeComponent implements OnInit {

  // Form that contains address input
  form: FormGroup;
  address: FormControl;

  // Array that stores all addresses obtained from google prediction, based on input typed
  results: google.maps.places.QueryAutocompletePrediction[];

  // Address selected after the typing
  placeSelected: Place;

  // Pre defined messages and labels
  messages = HomeMessages;

  // Attribute to show error messages on view
  errorMessage: string = "";

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private loadingService: LoadingService,
    private homeService: HomeService) { }


  /**
   * ngOnInit
   */
  ngOnInit(): void {

    // Init Form Group
    this.address = new FormControl("");

    this.form = new FormGroup({
      address: this.address
    });

    // Get the string typed when its length is grater then 1
    this.form.valueChanges.subscribe(form => {
      if (form.address.trim().length > 1) {
        this.onType(form.address.trim());
      } else {
        this.results = [];
      }
    });
  }

  /**
   * Method fired when input change is triggered
   * @param input 
   */
  onType(input: string) {
    this.errorMessage = null;
    this.loadingService.showLoading();

    // Call the autocomplete method
    this.homeService.getAutoComplete(input).then(result => {
      this.results = result;
    })
      .catch()
      .finally(() => this.loadingService.hideLoading());
  }
  /**
   * Method that obtain the coordinates to specific location select on the list
   * @param place 
   */
  getCoordinates(place: google.maps.places.QueryAutocompletePrediction) : void {
    this.errorMessage = null;
    this.loadingService.showLoading();
    this.homeService.getCoordinates(place).then((result : google.maps.GeocoderResult[]) => {
      if (result.length) {
        
        this.placeSelected = {
          lat: result[0].geometry.location.lat(),
          lng: result[0].geometry.location.lng(),
          address_name: result[0].formatted_address
        }
        // Store address on session
        this.sessionStorageService.setPlace(this.placeSelected);
        //Navigate to products view
        this.router.navigate(["/products"]);
        
      }
    })
      .catch(() => { 
        this.loadingService.hideLoading();
        this.errorMessage = this.messages.ERROR_COORD; 
      });
  }

}
