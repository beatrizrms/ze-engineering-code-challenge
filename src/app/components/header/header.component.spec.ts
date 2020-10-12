import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import { HeaderComponent } from './header.component';
import { CartService } from 'src/app/services/cart.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { CartServiceMock, SessionStorageServiceMock, PlaceMock } from 'src/mocks';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let cart;
    let sessionStorage;

    beforeEach(async(() => {
        SessionStorageServiceMock.havePlace.mockImplementationOnce(() => {
            return of(PlaceMock).pipe(delay(500));
        });

        CartServiceMock.cartUpdated.mockImplementationOnce(() => {
            return of(null).pipe(delay(500));
        });

        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                { provide: CartService, useValue: CartServiceMock },
                { provide: SessionStorageService, useValue: SessionStorageServiceMock }
            ],
            declarations: [HeaderComponent]
        });

        cart = TestBed.get(CartService);
        sessionStorage = TestBed.get(SessionStorageService);

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    test('HeaderComponent should exist', () => {
        expect(component).toBeDefined();
    });

    test('Address have to be defined', () => {
        expect(component.address.address_name).toBe(PlaceMock.address_name);
        expect(component.address).toBeDefined();
    });

    test('amountItens have to be defined', () => {
        expect(component.amountItens).toBe(3);
        expect(component.address).toBeDefined();
    });
    
});




