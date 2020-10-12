import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/CartItem';
import { Place } from 'src/app/model/Place';
import { Product } from 'src/app/model/Produts';
import { CartService } from 'src/app/services/cart.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})

/**
 * Component that represents the header of application
 */
export class HeaderComponent {

  address: Place;
  itemsCart: CartItem[] = [];
  amountItens: number = 0;

  constructor(
    private sessionStorageService: SessionStorageService,
    private cartServise: CartService
  ) {

    // Address stored in browser's session 
    this.address = this.sessionStorageService.getPlace();

    // Amount of items on cart choosed by user
    this.amountItens = this.cartServise.getAmount();

    // Get new place choosed if event havePlace trigger
    sessionStorageService.havePlace().subscribe((place: Place) => {
      this.address = place;
    });

    // Get cart items updated if cartUpdated trigger.This will update the number of the basket icon
    cartServise.cartUpdated().subscribe((cartItems: CartItem[]) => {
      this.itemsCart = cartItems;
      this.amountItens = this.cartServise.getAmount();
    });
  }

}
