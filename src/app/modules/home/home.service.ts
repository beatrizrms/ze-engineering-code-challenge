import { Inject, Injectable } from "@angular/core";
import { Place } from 'src/app/model/Place';

/**
 * Home Service
 * Provide methods to call Google api to work with addresses and geocoding
 */
@Injectable({ providedIn: "root" })
export class HomeService {

  // Places auto complete service by google
  places = new google.maps.places.AutocompleteService();

  // Geocoder auto complete service by google
  geocoder = new google.maps.Geocoder();


  /**
   * Call getQueryPredictions method (autocomplete) to get addresses based on input parameter
   * @param input
   */
  getAutoComplete(input: string): Promise<google.maps.places.QueryAutocompletePrediction[]> {

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
    return new Promise((resolve, reject) => {
      this.geocoder.geocode(
        { 'address': place.description },
        (directions: google.maps.GeocoderResult[]) => {
          resolve(directions);
        })
    });
  }
}