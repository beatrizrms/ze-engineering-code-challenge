export interface Products {
    poc: Poc
}

export interface Poc {
    id: string,
    products: Product[]
}

export interface Product {
    id: string,
    title: string
    rgb: boolean,
    images: Image[]
    productVariants: ProductVariant[]
}

export interface Image {
    url: string
}

export interface ProductVariant {
    availableDate: string,
    productVariantId: string,
    price: number,
    inventoryItemId: string,
    shortDescription: string,
    title: string,
    published: null,
    volume: string,
    volumeUnit: string,
    description: string,
    subtitle: string,
    components: any[]
}