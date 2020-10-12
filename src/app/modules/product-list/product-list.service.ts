import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ErrorGraphQLResponse, GraphQLResponse } from 'src/app/model/GraphQL';
import { Categories } from 'src/app/model/Categories';
import { Distribuitors } from 'src/app/model/Distribuitor';
import { Place } from 'src/app/model/Place';
import { Products } from 'src/app/model/Produts';
import { Queries } from './queries';

/**
 * ProductListService
 * provide methods to get categories, distribuitors and products
 */
@Injectable({ providedIn: "root" })
export class ProductListService {

  constructor(private apollo: Apollo) { }

  /**
   * Get all categories
   * @param place 
   */
  getAllCategories(place: Place): Promise<GraphQLResponse<Categories> | ErrorGraphQLResponse> {

    return new Promise((resolve, reject) => {
      this.apollo.watchQuery({
        query: Queries.categories,
        variables:
        {
          "algorithm": "NEAREST",
          "lat": place.lat,
          "long": place.lng,
          "now": new Date().toISOString()
        }
      }).valueChanges.subscribe(result => {
        if (result.data) {
          resolve(<GraphQLResponse<Categories>>result);
        } else {
          reject(result)
        }

      });
    });
  }

  /**
   * Get distribuitor (get id and pass to products request)
   * @param place 
   */
  findDistributor(place: Place): Promise<GraphQLResponse<Distribuitors> | ErrorGraphQLResponse> {
    return new Promise((resolve, reject) => {
      this.apollo.watchQuery({
        query: Queries.distribuitor,
        variables:
        {
          "algorithm": "NEAREST",
          "lat": place.lat,
          "long": place.lng,
          "now": new Date().toISOString()
        }
      }).valueChanges.subscribe(result => {
        if (result.data) {
          resolve(<GraphQLResponse<Distribuitors>>result);
        } else {
          reject(result)
        }
      });
    });
  }

  /**
   * Get products from a distribuitor and category
   * @param id 
   * @param search 
   * @param category 
   */
  getProducts(id: string, search: string, category: string): Promise<GraphQLResponse<Products> | ErrorGraphQLResponse> {
    return new Promise((resolve, reject) => {
      this.apollo.watchQuery({
        query: Queries.products
        ,
        variables:
        {
          "id": id,
          "search": search,
          "categoryId": category
        }
      }).valueChanges.subscribe(result => {
        if (result.data) {
          resolve(<GraphQLResponse<Products>>result);
        } else {
          reject(result)
        }
      });
    });
  }

}