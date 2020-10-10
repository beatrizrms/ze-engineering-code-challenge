import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ErrorGraphQLResponse, GraphQLResponse } from 'src/app/model/GraphQL';
import { Categories } from 'src/app/model/Categories';
import { Distribuitors } from 'src/app/model/Distribuitor';
import { Place } from 'src/app/model/Place';
import { Products } from 'src/app/model/Produts';

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
        query: gql`query allCategoriesSearch {
                allCategory{
                  title
                  id
                }
              }`,
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
        query: gql`query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
                pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
                  __typename
                  id
                  status
                  tradingName
                  officialName
                  deliveryTypes {
                    __typename
                    pocDeliveryTypeId
                    deliveryTypeId
                    price
                    title
                    subtitle
                    active
                  }
                  paymentMethods {
                    __typename
                    pocPaymentMethodId
                    paymentMethodId
                    active
                    title
                    subtitle
                  }
                  pocWorkDay {
                    __typename
                    weekDay
                    active
                    workingInterval {
                      __typename
                      openingTime
                      closingTime
                    }
                  }
                  address {
                    __typename
                    address1
                    address2
                    number
                    city
                    province
                    zip
                    coordinates
                  }
                  phone {
                    __typename
                    phoneNumber
                  }
                }
              }`,
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
        query: gql`query poc($id: ID!, $categoryId: Int, $search: String){
            poc(id: $id) {
              id
              products(categoryId: $categoryId, search: $search) {
                id
                title
                rgb
                images {
                  url
                }
                productVariants {
                  availableDate
                  productVariantId
                  price
                  inventoryItemId
                  shortDescription
                  title
                  published
                  volume
                  volumeUnit
                  description
                  subtitle
                  components {
                    id
                    productVariantId
                    productVariant {
                      id
                      title
                      description
                      shortDescription
                    }
                  }
                }
              }
            }
          }`
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