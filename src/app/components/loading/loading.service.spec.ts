import {
    async,
} from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
    let loadingService: LoadingService;

    beforeEach(async(() => {
        loadingService = new LoadingService();
    }));

    test('LoadingService exists', () => {
        expect(loadingService).toBeDefined()
    });

    test('Testing isLoading', () => {
        spyOn(loadingService.observable, "asObservable");
        loadingService.isLoading();
        expect(loadingService.observable.asObservable).toBeCalled();
    });
});
