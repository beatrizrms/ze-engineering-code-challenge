import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';

import { ProductListComponent } from './product-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ProductListService } from './product-list.service';
import { CartService } from 'src/app/services/cart.service';
import { MockCategories, MockDist, MockProducts, CartServiceMock, ProductListServiceMock } from 'src/mocks';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    let cart;

    const initModule = () => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                SharedComponentsModule
            ],
            providers: [
                { provide: ProductListService, useValue: ProductListServiceMock },
                { provide: CartService, useValue: CartServiceMock }
            ],
            declarations: [ProductListComponent]
        }).compileComponents();
    
        cart = TestBed.get(CartService);
    
        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    };

    describe('ProductListComponent  - success flow', () => {

        beforeEach(async(() => {
            ProductListServiceMock.getAllCategories.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve(MockCategories);
                });
            });

            ProductListServiceMock.findDistributor.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve(MockDist);
                });
            });
        }));

        beforeEach(async(() => {
            initModule();
        }));

        test('ProductListComponent should exist', () => {
            expect(component).toBeDefined();
        });

        test('Testing initial flow - call getAllCategories and findDistributor', async () => {
            await component.initRequests();
            expect(component.categories).toBe(MockCategories.data.allCategory);
            expect(component.distribuitor.tradingName).toBe(MockDist.data.pocSearch[0].tradingName);
        });

        test('Testing getProducts', async () => {

            ProductListServiceMock.getProducts.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve(MockProducts);
                });
            });

            await component.getProducts();
            expect(component.products).toBe(MockProducts.data.poc.products);
        });

        test('Testing setCategory', async () => {

            ProductListServiceMock.getProducts.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve(MockProducts);
                });
            });

            await component.setCategory(MockCategories.data.allCategory[0]);

            expect(component.category).toBe(MockCategories.data.allCategory[0].id);
            expect(component.products).toBe(MockProducts.data.poc.products);
        });

        test('Testing addRemToCart ( add product)', () => {
            spyOn(cart, 'addItem');
            component.addRemToCart(MockProducts.data.poc.products[0], true);
            expect(cart.addItem).toHaveBeenCalled();
        });

        test('Testing addRemToCart ( remove product)', () => {
            spyOn(cart, 'removeItem');
            component.addRemToCart(MockProducts.data.poc.products[0], false);
            expect(cart.removeItem).toHaveBeenCalled();
        });

    });

    describe('ProductListComponent  - error flow', () => {
        beforeEach(async(() => {
            ProductListServiceMock.getAllCategories.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    reject();
                });
            });

            ProductListServiceMock.findDistributor.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    reject();
                });
            });
        }));

        beforeEach(async(() => {
            initModule();
        }));

        test('ProductListComponent - erroMessage filled', () => {
            expect(component.errorMessage).toBeDefined();
        });

        test('ProductListComponent - call getProducts - erroMessage filled', async () => {
            ProductListServiceMock.getProducts.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    reject();
                });
            });

            await component.getProducts();
            expect(component.products).toBeUndefined();
            expect(component.errorMessage).toBeDefined();
        });

    });
});