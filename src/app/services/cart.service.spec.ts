import {
    async,
} from '@angular/core/testing';

import { CartService } from './cart.service';

const mockSession = '[{"id":"8877","products":[{"id":"8877","title":"Brahma 269ml - Unidade","rgb":false,"images":[{"url":"https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008877_02c7ebe9-c23a-405c-8af8-8f0988f276c7.jpg","__typename":"ProductImage"}],"productVariants":[{"availableDate":"2018-10-31T00:00:00","productVariantId":"8511","price":1.99,"inventoryItemId":"80139","shortDescription":null,"title":"Brahma 269ml - Unidade","published":null,"volume":"0,00269","volumeUnit":null,"description":null,"subtitle":null,"components":[],"__typename":"ProductVariant"}],"__typename":"Product"}]},{"id":"8878","products":[{"id":"8878","title":"Brahma 269ml - Pack com 15 Unidades","rgb":false,"images":[{"url":"https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008878_03ce3fab-0a5c-4e83-ac4a-8371370e92c5.jpg","__typename":"ProductImage"}],"productVariants":[{"availableDate":"2018-10-31T00:00:00","productVariantId":"8512","price":29.85,"inventoryItemId":"80140","shortDescription":null,"title":"Brahma 269ml - Pack com 15 Unidades","published":null,"volume":"0,04035","volumeUnit":null,"description":null,"subtitle":null,"components":[],"__typename":"ProductVariant"}],"__typename":"Product"}]}]';

describe('CartService', () => {
    let cartService;

    beforeEach(async(() => {
        sessionStorage.setItem("CARD_ITEMS", mockSession);
        cartService = new CartService();
    }));

    afterAll(async(() => {
        sessionStorage.removeItem("CARD_ITEMS");
    }));

    test('CartService exists', () => {
        expect(cartService).toBeDefined()
    });

    test('Testing cartUpdated', () => {
        cartService.cartUpdated();
    });

    test('Testing getItems', () => {
        cartService.getItems();
        expect(cartService.items.length).toBe(2);
    });

    test('Testing addItem - new product (not yet on the list)', () => {
        spyOn(cartService, "addNewProduct");
        let product = { "id": "9407", "title": "Doritos Queijo Nacho 55g", "rgb": false, "images": [{ "url": "https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009407_91c56ba0-0fe4-4ee5-a3e7-938ce2f13367.jpg", "__typename": "ProductImage" }], "productVariants": [{ "availableDate": "2018-10-31T00:00:00", "productVariantId": "9041", "price": 7.5, "inventoryItemId": "80336", "shortDescription": null, "title": "Doritos Queijo Nacho 55g", "published": null, "volume": "0", "volumeUnit": null, "description": null, "subtitle": "Para matar a fome", "components": [], "__typename": "ProductVariant" }], "__typename": "Product" };
        cartService.addItem(product);

        expect(cartService.addNewProduct).toHaveBeenCalled();
    });

    test('Testing addItem - existing product', () => {
        spyOn(cartService, "addExistingProduct");
        let product = { "id": "8877", "title": "Brahma 269ml - Unidade", "rgb": false, "images": [{ "url": "https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008877_02c7ebe9-c23a-405c-8af8-8f0988f276c7.jpg", "__typename": "ProductImage" }], "productVariants": [{ "availableDate": "2018-10-31T00:00:00", "productVariantId": "8511", "price": 1.99, "inventoryItemId": "80139", "shortDescription": null, "title": "Brahma 269ml - Unidade", "published": null, "volume": "0,00269", "volumeUnit": null, "description": null, "subtitle": null, "components": [], "__typename": "ProductVariant" }], "__typename": "Product" };
        cartService.addItem(product);

        expect(cartService.addExistingProduct).toHaveBeenCalled();
    });

    test('Testing removeItem', () => {
        spyOn(cartService, "removeExistingProduct");
        let product = { "id": "8877", "title": "Brahma 269ml - Unidade", "rgb": false, "images": [{ "url": "https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008877_02c7ebe9-c23a-405c-8af8-8f0988f276c7.jpg", "__typename": "ProductImage" }], "productVariants": [{ "availableDate": "2018-10-31T00:00:00", "productVariantId": "8511", "price": 1.99, "inventoryItemId": "80139", "shortDescription": null, "title": "Brahma 269ml - Unidade", "published": null, "volume": "0,00269", "volumeUnit": null, "description": null, "subtitle": null, "components": [], "__typename": "ProductVariant" }], "__typename": "Product" };
        cartService.removeItem(product);

        expect(cartService.removeExistingProduct).toHaveBeenCalled();
    });

    test('Testing getAmount', () => {
        let amount = cartService.getAmount();

        expect(amount).toBe(2);
    });

    test('Testing addExistingProduct', () => {
        cartService.getItems();
        let cartItemsMock = cartService.getAmount();
        console.log(cartItemsMock);
        let product = { "id": "8877", "title": "Brahma 269ml - Unidade", "rgb": false, "images": [{ "url": "https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008877_02c7ebe9-c23a-405c-8af8-8f0988f276c7.jpg", "__typename": "ProductImage" }], "productVariants": [{ "availableDate": "2018-10-31T00:00:00", "productVariantId": "8511", "price": 1.99, "inventoryItemId": "80139", "shortDescription": null, "title": "Brahma 269ml - Unidade", "published": null, "volume": "0,00269", "volumeUnit": null, "description": null, "subtitle": null, "components": [], "__typename": "ProductVariant" }], "__typename": "Product" };
        cartService.addExistingProduct(product, 0);
        cartService.getItems();
        expect(cartItemsMock).toBeLessThan(cartService.getAmount());
    });

    test('Testing addNewProduct', () => {
        cartService.getItems();
        let cartItemsMock = cartService.getAmount();
        let product = { "id": "8877", "title": "Brahma 269ml - Unidade", "rgb": false, "images": [{ "url": "https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008877_02c7ebe9-c23a-405c-8af8-8f0988f276c7.jpg", "__typename": "ProductImage" }], "productVariants": [{ "availableDate": "2018-10-31T00:00:00", "productVariantId": "8511", "price": 1.99, "inventoryItemId": "80139", "shortDescription": null, "title": "Brahma 269ml - Unidade", "published": null, "volume": "0,00269", "volumeUnit": null, "description": null, "subtitle": null, "components": [], "__typename": "ProductVariant" }], "__typename": "Product" };
        cartService.addNewProduct(product);
        cartService.getItems();
        expect(cartItemsMock).toBeLessThan(cartService.getAmount());
    });

    test('Testing removeExistingProduct', () => {
        cartService.getItems();
        let cartItemsMock = cartService.getAmount();
        cartService.removeExistingProduct(0);
        cartService.getItems();
        expect(cartItemsMock).toBeGreaterThan(cartService.getAmount());
    });

    describe('CartService - ( cart empty )', () => {
        beforeEach(async(() => {
            sessionStorage.setItem("CARD_ITEMS", null);
            cartService = new CartService();
        }));

        test('Testing addNewProduct with sessionStorage empty', () => {
           
            spyOn(cartService, "addNewProduct");
            let product = { "id": "9407", "title": "Doritos Queijo Nacho 55g", "rgb": false, "images": [{ "url": "https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009407_91c56ba0-0fe4-4ee5-a3e7-938ce2f13367.jpg", "__typename": "ProductImage" }], "productVariants": [{ "availableDate": "2018-10-31T00:00:00", "productVariantId": "9041", "price": 7.5, "inventoryItemId": "80336", "shortDescription": null, "title": "Doritos Queijo Nacho 55g", "published": null, "volume": "0", "volumeUnit": null, "description": null, "subtitle": "Para matar a fome", "components": [], "__typename": "ProductVariant" }], "__typename": "Product" };
            cartService.addItem(product);

            expect(cartService.addNewProduct).toHaveBeenCalled();
        });
    });

});




