import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/components/loading/loading.service';
import { Categories, Category } from 'src/app/model/Categories';
import { Distribuitor, Distribuitors } from 'src/app/model/Distribuitor';
import { GraphQLResponse } from 'src/app/model/GraphQL';
import { Place } from 'src/app/model/Place';
import { Product, Products } from 'src/app/model/Produts';
import { CartService } from 'src/app/services/cartService.service';
import { SessionStorageService } from 'src/app/services/sessionStorage.service';
import { ProductListService } from './product-list-service';
import { ProductMessages } from './product-list.constant';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [
    './product-list.component.scss'
  ]
})
/**
 * ProductListComponent
 * Component that show all available products based on address selected by user
 */
export class ProductListComponent implements OnInit {

  // Address selectes
  place: Place;

  // Categories to filter the products list
  categories: Category[];

  // Category init as null if but selected change the list of products
  category: string = null;

  // The distribuitor used to send to products request
  distribuitor: Distribuitor;

  // List of products
  products: Product[];

  // Search query
  search: string = "";

  // Pre defined messages to show on feedback component
  messages = ProductMessages;

  // Attribute to load the errors messages 
  errorMessage: string = "";

  constructor(
    private productListService: ProductListService,
    private cartService: CartService,
    private sessionStorageService: SessionStorageService,
    private loadingService: LoadingService) {
    // Get initial info to get the products
    this.place = this.sessionStorageService.getPlace();
    // Show loading
    this.loadingService.showLoading();
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.errorMessage = null;

    // Request the categories to ProductService
    this.productListService
      .getAllCategories(this.place)
      .then((result: GraphQLResponse<Categories>) => {
        if (result.data) {
          this.categories = result.data.allCategory;
          this.getProducts();
        } else {
          this.errorMessage = this.messages.ERROR_CAT;
        }
      }).catch(() => {
        this.errorMessage = this.messages.ERROR_CAT;
      });

    // Request the distribuitor to ProductService
    this.productListService
      .findDistributor(this.place)
      .then((result: GraphQLResponse<Distribuitors>) => {
        if (result.data && result.data.pocSearch.length) {
          this.distribuitor = result.data.pocSearch[0];
          this.getProducts();
        }
      }).catch(() => {
        this.errorMessage = this.messages.ERROR_DIST;
      });
  }

  /**
   * Method that request products to ProductService, called for getAllCategories, findDistributor but only
   * pass to request products if both properties (categories and distribuitor) are filled
   */
  getProducts() {
    this.errorMessage = null;
    if (this.categories && this.distribuitor) {
      this.productListService
        .getProducts(this.distribuitor.id, this.search, this.category)
        .then((result: GraphQLResponse<Products>) => {
          if (result.data && result.data.poc) {
            this.products = result.data.poc.products;
          }
        }).catch(() => {
          this.errorMessage = this.messages.ERROR_PRD;
        })
        .finally(() => {
          this.loadingService.hideLoading();
        });
    }
  }


  /**
   * Method that set a category to filter the products list
   * @param cat 
   */
  setCategory(cat: Category) {
    this.category = cat.id;
    this.getProducts();
  }

  /**
   * Add products to cart (Only store the products on storage and show the amount in the basket icon)
   * @param product 
   * @param addOrRemove 
   */
  addRemToCart(product: Product, addOrRemove: boolean) {
    if (addOrRemove) {
      this.cartService.addItem(product);
    } else {
      this.cartService.removeItem(product);
    }
  }

  /**
   * Method called by button 'Back to top'
   */
  scrollTop() {
    window.scrollTo(0, 0);
  }

}
