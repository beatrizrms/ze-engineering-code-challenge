import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { FeedbackComponent } from './feedback.component';


describe('HeaderComponent', () => {
    let component: FeedbackComponent;
    let fixture: ComponentFixture<FeedbackComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
            ],
            declarations: [FeedbackComponent]
        });

        fixture = TestBed.createComponent(FeedbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    test('FeedbackComponent should exist', () => {
        expect(component).toBeDefined();
    });

});




