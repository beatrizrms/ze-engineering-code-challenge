import { Place } from './app/model/Place'

/*****************************
 *  Objects / Models / Returns
 ****************************/
export const PlaceMock : Place = {
    lat: 2333,
    lng: -9878,
    address_name: "Rua Américo Brasiliense"
}

export const MockDist = {
    "data": {
        "pocSearch": [
            {
                "__typename": "POC",
                "id": "532",
                "status": "AVAILABLE",
                "tradingName": "Distribuidor de Treinamento",
                "officialName": "Distribuidor de Treinamento",
                "deliveryTypes": [
                    {
                        "__typename": "POCDeliveryType",
                        "pocDeliveryTypeId": "1284",
                        "deliveryTypeId": "16",
                        "price": null,
                        "title": "RECEBER",
                        "subtitle": "em até uma hora",
                        "active": true
                    }
                ],
                "paymentMethods": [
                    {
                        "__typename": "POCPaymentMethod",
                        "pocPaymentMethodId": "1292",
                        "paymentMethodId": "46",
                        "active": true,
                        "title": "Crédito (Visa/Mastercard)",
                        "subtitle": "Cartão de Crédito Visa/Master"
                    }
                ],
                "pocWorkDay": [
                    {
                        "__typename": "POCWorkDay",
                        "weekDay": 1,
                        "active": true,
                        "workingInterval": [
                            {
                                "__typename": "POCWorkingInterval",
                                "openingTime": "09:10:00",
                                "closingTime": "23:59:00"
                            },
                            {
                                "__typename": "POCWorkingInterval",
                                "openingTime": "00:00:00",
                                "closingTime": "02:00:00"
                            }
                        ]
                    }
                ],
                "address": {
                    "__typename": "POCAddress",
                    "address1": "Rua Américo Brasiliense",
                    "address2": null,
                    "number": "1781",
                    "city": "São Paulo",
                    "province": "SP",
                    "zip": "01457005",
                    "coordinates": "{\"type\": \"Point\", \"coordinates\": [-46.703635899999995, -23.6305321]}"
                },
                "phone": {
                    "__typename": "POCPhone",
                    "phoneNumber": "1143272169"
                }
            }
        ]
    }
}

export const MockProducts = {
    "data": {
        "poc": {
            "id": "532",
            "products": [
                {
                    "id": "8868",
                    "title": "Skol 269ml - Unidade",
                    "rgb": false,
                    "images": [
                        {
                            "url": "https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8868_205f958d-2e51-48a3-b4d5-a2998765571a.jpg"
                        }
                    ],
                    "productVariants": [
                        {
                            "availableDate": "2018-10-31T00:00:00",
                            "productVariantId": "8502",
                            "price": 2.09,
                            "inventoryItemId": "80149",
                            "shortDescription": null,
                            "title": "Skol 269ml - Unidade",
                            "published": null,
                            "volume": "0,00269",
                            "volumeUnit": null,
                            "description": null,
                            "subtitle": "Cervejas",
                            "components": []
                        }
                    ]
                },
                {
                    "id": "8869",
                    "title": "Skol 269ml - Pack com 15 Unidades",
                    "rgb": false,
                    "images": [
                        {
                            "url": "https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/products/8503.png"
                        }
                    ],
                    "productVariants": [
                        {
                            "availableDate": "2018-10-31T00:00:00",
                            "productVariantId": "8503",
                            "price": 31.35,
                            "inventoryItemId": "80151",
                            "shortDescription": null,
                            "title": "Skol 269ml - Pack com 15 Unidades",
                            "published": null,
                            "volume": "0,04035",
                            "volumeUnit": null,
                            "description": null,
                            "subtitle": "Cervejas",
                            "components": []
                        }
                    ]
                },
                {
                    "id": "8877",
                    "title": "Brahma 269ml - Unidade",
                    "rgb": false,
                    "images": [
                        {
                            "url": "https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008877_02c7ebe9-c23a-405c-8af8-8f0988f276c7.jpg"
                        }
                    ],
                    "productVariants": [
                        {
                            "availableDate": "2018-10-31T00:00:00",
                            "productVariantId": "8511",
                            "price": 1.99,
                            "inventoryItemId": "80139",
                            "shortDescription": null,
                            "title": "Brahma 269ml - Unidade",
                            "published": null,
                            "volume": "0,00269",
                            "volumeUnit": null,
                            "description": null,
                            "subtitle": null,
                            "components": []
                        }
                    ]
                }
            ]
        }
    }
}

export const MockCategories = {
    "data": {
        "allCategory": [
            {
                "title": "Cervejas",
                "id": "94"
            },
            {
                "title": "Destilados",
                "id": "95"
            },
            {
                "title": "Vinhos",
                "id": "92"
            },
            {
                "title": "Sem álcool",
                "id": "96"
            },
            {
                "title": "Petiscos",
                "id": "97"
            },
            {
                "title": "Outros",
                "id": "98"
            }
        ]
    }
}

export const MockPlaceAutoComplete: google.maps.places.QueryAutocompletePrediction = {
    description: "Rua Américo Brasiliense",
    matched_substrings: [{ length: 1, offset: 2 }],
    place_id: "",
    terms: []
};

export const MockCoordinates = [{
    geometry: {
        location: {
            lat: jest.fn().mockReturnValue(2333),
            lng: jest.fn().mockReturnValue(-9878)
        }
    },
    formatted_address: MockPlaceAutoComplete.description
}];

export const MockPlaceResult = {
    lat: 2333,
    lng: -9878,
    address_name: "Rua Américo Brasiliense"
}

/*****************************
 *  Services
 ****************************/

export const CartServiceMock : any = {
    cartUpdated: jest.fn(),
    getAmount: jest.fn().mockReturnValue(3),
    removeItem :jest.fn(),
    addItem: jest.fn()
}

export const SessionStorageServiceMock : any = {
    getPlace: jest.fn().mockReturnValue(PlaceMock),
    havePlace: jest.fn()
}

export const ProductListServiceMock = {
    getAllCategories: jest.fn(),
    findDistributor: jest.fn(),
    getProducts: jest.fn()
}

export const RouterMock = {
    url : '',
    navigate : jest.fn()
}

export const HomeServiceMock = {
    getAutoComplete: jest.fn(),
    getCoordinates: jest.fn()
}