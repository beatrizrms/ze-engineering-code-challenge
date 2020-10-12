import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { initialize } from "@googlemaps/jest-mocks";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { HomeServiceMock, MockCoordinates, MockPlaceAutoComplete, MockPlaceResult, RouterMock } from 'src/mocks';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let router: Router;

    beforeEach(async(() => {
        initialize();

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                SharedComponentsModule
            ],
            providers: [
                { provide: HomeService, useValue: HomeServiceMock },
                { provide: Router, useValue: RouterMock }
            ],
            declarations: [HomeComponent]
        });
        router = TestBed.get(Router);

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    test('HomeComponent should exist', () => {
        expect(component).toBeDefined();
    });

    test('Type some text in input - onType Function need to be called', () => {
        spyOn(component, 'onType');
        const el = fixture.nativeElement.querySelector('input');
        el.value = 'something';
        el.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(component.address.value).toBe('something');
            expect(component.onType).toHaveBeenCalled();
        });
    });

    test('Type some text in input - onType Function havent to be called (One char only)', () => {
        spyOn(component, 'onType');
        const el = fixture.nativeElement.querySelector('input');
        el.value = 's';
        el.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.address.value).toBe('s');
            expect(component.onType).not.toHaveBeenCalled();
        });
    });

    test('Testing onType function', async () => {
        HomeServiceMock.getAutoComplete.mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                resolve(MockPlaceResult);
            });
        });

        await component.onType("test address");
        expect(component.results).toBe(MockPlaceResult);
    });

    test('Testing getCoordinates function', async () => {
        HomeServiceMock.getCoordinates.mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                resolve(MockCoordinates);
            });
        });

        // RouterMock    
        spyOn(router, 'navigate');
        await component.getCoordinates(MockPlaceAutoComplete);
        expect(component.placeSelected).toEqual(MockPlaceResult);
        expect(router.navigate).toHaveBeenCalledWith(['/products']);

    });

});




