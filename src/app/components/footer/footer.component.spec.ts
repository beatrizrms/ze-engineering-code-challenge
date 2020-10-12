import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { initialize } from "@googlemaps/jest-mocks";

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async(() => {
        initialize();

        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                
            ],
            declarations: [FooterComponent]
        });

        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    test('FooterComponent should exist', () => {
        expect(component).toBeDefined();
    });
    
});




