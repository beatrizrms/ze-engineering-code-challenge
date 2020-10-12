import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { CartItem } from '../model/CartItem';
import { Product } from '../model/Produts';
/**
 * CartService
 * Responsable to add/remove products on the cart
 */
@Injectable({ providedIn: "root" })
export class CartService {

    // Constant key to store at session storage
    CARD_ITEMS: string = "CARD_ITEMS";

    // Items of cart
    items: CartItem[] = [];

    // Observable that fires on each change on cart
    observable: Subject<CartItem[]> = new Subject<CartItem[]>();

    constructor() { }

    /**
     * Method that returns the observable of cart items
     */
    cartUpdated(): Observable<CartItem[]> {
        return this.observable.asObservable();
    }

    /**
     * Method that get items from teh session storage and set property this.items
     */
    getItems(): void {
        let items = sessionStorage.getItem(this.CARD_ITEMS);
        this.items = items ? JSON.parse(items) : [];
    }

    /**
     * Add items (products) on the basket/cart
     * verify the previous existence of product
     * @param product 
     */
    addItem(product: Product): void {
        this.getItems();
        if (this.items && this.items.length) {
            let itemIndex = this.items.findIndex(item => item.id == product.id);
            if (itemIndex != -1) {
                this.addExistingProduct(product, itemIndex);
            } else {
                this.addNewProduct(product);
            }
        } else {
            this.addNewProduct(product);
        }

        this.observable.next(this.items);
    }

    /**
     * Add a single product if not exists yet on cart
     * @param product 
     */
    addNewProduct(product: Product) {
        this.items.push(
            {
                id: product.id,
                products: [
                    product
                ]
            }
        );
        sessionStorage.setItem(this.CARD_ITEMS, JSON.stringify(this.items));
    }

    /**
     * Add a single product on its group list if already exists (plus)
     * @param product 
     */
    addExistingProduct(product: Product, index: number) {
        this.items[index].products.push(product);
        sessionStorage.setItem(this.CARD_ITEMS, JSON.stringify(this.items));
    }

    /**
     * Remove item from de basket/cart
     * @param product 
     */
    removeItem(product: Product): void {
        this.getItems();
        if (this.items && this.items.length) {
            let itemIndex = this.items.findIndex(item => item.id == product.id);
            if (itemIndex != -1) {
                this.removeExistingProduct(itemIndex);
            }
        }

        this.observable.next(this.items);
    }

    /**
     * Remove existing product of the cart
     * @param index 
     */
    removeExistingProduct(index: number) {
        this.items[index].products.pop();
        sessionStorage.setItem(this.CARD_ITEMS, JSON.stringify(this.items));
    }

    /**
     * Get amount of products (counting the grouped products = more than one of same type)
     * @param index 
     */
    getAmount(): number {
        this.getItems();
        let sum = 0;
        this.items.forEach(elem => {
            sum += elem.products.length;
        });

        return sum;
    }
}