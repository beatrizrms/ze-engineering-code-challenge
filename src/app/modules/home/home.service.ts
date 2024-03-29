import { Injectable } from "@angular/core";

/**
 * Home Service
 * Provide methods to call Google api to work with addresses and geocoding
 */
@Injectable({ providedIn: "root" })
export class HomeService {

  // Places auto complete service by google
  places;

  // Geocoder auto complete service by google
  geocoder;


  /**
   * Call getQueryPredictions method (autocomplete) to get addresses based on input parameter
   * @param input
   */
  getAutoComplete(input: string): Promise<google.maps.places.QueryAutocompletePrediction[]> {

    this.places = new google.maps.places.AutocompleteService();

    return new Promise((resolve, reject) => {
      this.places.getQueryPredictions(
        { input: input },
        (places: google.maps.places.QueryAutocompletePrediction[]) => {
          resolve(places);
        });
    });
  }

  /**
   * Call getCoordinates method to get directions (Lat, Lng) based on a specific address
   * @param place 
   */
  getCoordinates(place: google.maps.places.QueryAutocompletePrediction): Promise<google.maps.GeocoderResult[]> {
    
    this.geocoder = new google.maps.Geocoder();
    
    return new Promise((resolve, reject) => {
      this.geocoder.geocode(
        { 'address': place.description },
        (directions: google.maps.GeocoderResult[]) => {
          resolve(directions);
        })
    });
  }
}