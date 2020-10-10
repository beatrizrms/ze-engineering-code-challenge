import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { Place } from '../model/Place';

/**
 * SessionStorageService
 * Store in session the address choosed by the user
 */
@Injectable({ providedIn : "root"})
export class SessionStorageService {

    // Constant key to store at session storage
    PLACE : string = "PLACE";
    // Address selected
    address : Place;
     // Observable that fires on each change on cart
    observable : Subject<Place> = new Subject<Place>();

    constructor() { }
    
    /**
     * Method that returns the observable of place (address)
     */
    havePlace() : Observable<Place> {
        return this.observable.asObservable();
    }
    /**
     * Method that get a location of session storage and store on property this.address
     */
    getPlace() : Place{
        let place = sessionStorage.getItem(this.PLACE);
        this.address = place ? JSON.parse(place) : place;
        return this.address;
    }

    /**
     * Method that set a location on session storage and fire the changes
     * @param address 
     */
    setPlace(address : Place) : void {
        this.address = address;
        sessionStorage.setItem(this.PLACE, JSON.stringify(address));
        this.observable.next(this.address);
    }
}