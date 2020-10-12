import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { HomeService } from './home.service';
import { initialize } from "@googlemaps/jest-mocks";
import { MockCoordinates } from 'src/mocks';

declare global {
    interface Window {
        google
    }
}

const setupGoogleMock = () => {
    const google = {
        maps: {
            places: {
                AutocompleteService: class  {
                    getQueryPredictions () {
                        return jest.fn()
                    } 
                },
                PlacesServiceStatus: {
                    INVALID_REQUEST: 'INVALID_REQUEST',
                    NOT_FOUND: 'NOT_FOUND',
                    OK: 'OK',
                    OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                    REQUEST_DENIED: 'REQUEST_DENIED',
                    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                    ZERO_RESULTS: 'ZERO_RESULTS',
                },
            },
            Geocoder: class {
                geocode() {
                    return MockCoordinates
                }
            },
            GeocoderStatus: {
                ERROR: 'ERROR',
                INVALID_REQUEST: 'INVALID_REQUEST',
                OK: 'OK',
                OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                REQUEST_DENIED: 'REQUEST_DENIED',
                UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                ZERO_RESULTS: 'ZERO_RESULTS',
            },
        },
    };

    global.window.google = google;
};

describe('HomeService', () => {
    let homeService;

    beforeEach(async(() => {
        initialize();
        setupGoogleMock();
        homeService = new HomeService();
    }));

    test('getAutoComplete', () => {
        homeService.getAutoComplete("test address");
        expect(homeService.places).toBeDefined();
    });

    test('getCoordinates', () => {
        homeService.getCoordinates({description: "test address"});
        expect(homeService.geocoder).toBeDefined();
    });

});




