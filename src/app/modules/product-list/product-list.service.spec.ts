import {
    async,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MockCategories, MockDist, MockProducts, PlaceMock } from 'src/mocks';
import { ProductListService } from './product-list.service';

const apolloMock = {
    watchQuery: jest.fn().mockImplementation(() => { return { valueChanges: jest.fn() } }),
    query: jest.fn(),
    use: jest.fn((name: string) => {
        if (name === 'default') {
            return apolloMock;
        }
    }),
};

const mockApolloSubscribe = (mock) => {
    apolloMock.watchQuery.mockImplementation(() => {
        return { valueChanges: of(mock).pipe(delay(500)) }
    });
}

describe('ProductListService', () => {
    let productListService: ProductListService;

    beforeEach(async(() => {
        productListService = new ProductListService(apolloMock);
    }));

    test('ProductListService exists', () => {
        expect(productListService).toBeDefined()
    });

    describe('Categories - ', () => {

        beforeEach(async(() => {
            mockApolloSubscribe(MockCategories);
        }));

        test('Testing getAllCategories', () => {
            productListService.getAllCategories(PlaceMock);
            expect(apolloMock.watchQuery).toBeCalled();
        });
    });
    
    describe('Distribuitor - ', () => {

        beforeEach(async(() => {
            mockApolloSubscribe(MockDist);
        }));

        test('Testing findDistributor', () => {
            productListService.findDistributor(PlaceMock);
            expect(apolloMock.watchQuery).toBeCalled();
        });
    });

    describe('Products - ', () => {
        beforeEach(async(() => {
            mockApolloSubscribe(MockProducts);
        }));

        test('Testing getProducts', () => {
            productListService.getProducts("535", "", "");
            expect(apolloMock.watchQuery).toBeCalled();
        });
    });

    describe('Products - ', () => {
        beforeEach(async(() => {
            mockApolloSubscribe(MockProducts);
        }));

        test('Testing getProducts', () => {
            productListService.getProducts("535", "", "");
            expect(apolloMock.watchQuery).toBeCalled();
        });
    });
});
