import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { initialize } from "@googlemaps/jest-mocks";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeService } from './home.service';

const HomeServiceMock = {
    getAutoComplete: jest.fn(() => { 
        return new Promise((resolve, reject) => {
            resolve()
          });
    }),
    getCoordinates: jest.fn(() => { 
        return new Promise((resolve, reject) => {
            resolve(mockCoordinates)
          });
    })
}

const mockPlace: google.maps.places.QueryAutocompletePrediction = {
    description: "Rua Américo Brasiliense",
    matched_substrings: [{ length: 1, offset: 2 }],
    place_id: "",
    terms: []
};

const mockPlaceResult = {
    lat: 2333,
    lng: -9878,
    address_name: "Rua Américo Brasiliense"
}

const mockCoordinates = [{
    geometry: {
        location: {
            lat: mockPlaceResult.lat,
            lng: mockPlaceResult.lng
        }
    },
    formatted_address: mockPlaceResult.address_name
}];

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;


    beforeEach(async(() => {
        initialize();
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            providers: [
                { provide: HomeService, useValue: HomeServiceMock }
            ],
            declarations: [HomeComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));


    test('HomeComponent should exist', () => {
        expect(component).toBeDefined();
    });

    test('Type some text in input - onType Function have to be called', () => {
        const el = fixture.nativeElement.querySelector('input');
        el.value = 'something';
        el.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.address.value).toBe('something');
            // expect(component.results).toBe([{}]);
            expect(component.onType).toHaveBeenCalled();
        });
    });

    test('Type some text in input - onType Function havent to be called (One char only)', () => {
        const el = fixture.nativeElement.querySelector('input');
        el.value = 's';
        el.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.address.value).toBe('s');
        });
    });

    /*** ERRORRR */
    test('Testing get coordinates',  async () => {
        await component.getCoordinates(mockPlace);
        expect(component.errorMessage).toBeDefined();
        // expect(component.placeSelected.address_name).toBeDefined();
    });


});



