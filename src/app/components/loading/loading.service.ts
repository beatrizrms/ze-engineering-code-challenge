import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Component that render the loading effect when some request is sending
 */
@Injectable({ providedIn: "root" })
export class LoadingService {

    // Flag of loading is showing/true or hiding/false
    loading: boolean = false;
    // Observable that triggers when loading changes
    observable: Subject<boolean> = new Subject<boolean>();

    /**
     * Return the observable of loading property
     */
    isLoading(): Observable<boolean> {
        return this.observable.asObservable();
    }

    /**
     * Change loading to true ang trigger the event isLoading
     */
    showLoading(): void {
        this.loading = true;
        this.observable.next(this.loading);
    }

    /**
     * Change loading to false ang trigger the event isLoading
     */
    hideLoading(): void {
        this.loading = false;
        this.observable.next(this.loading);

    }
}