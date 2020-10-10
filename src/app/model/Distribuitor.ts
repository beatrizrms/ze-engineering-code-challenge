export interface Generic {
    __typename: string
}

export interface Distribuitors {
    pocSearch: Distribuitor[]
}

export interface Distribuitor extends Generic {
    address: AddressDist,
    deliveryTypes: DeliveryType[],
    id: string,
    officialName: string,
    paymentMethods: PaymentMethods[],
    phone: Phone,
    pocWorkDay: WorkDay[],
    status: string,
    tradingName: string
}


export interface AddressDist extends Generic{
    address1: string,
    address2: string,
    city: string,
    coordinates: string,
    number: string,
    province: string,
    zip: string
}

export interface DeliveryType extends Generic{
    active: boolean,
    deliveryTypeId: string,
    pocDeliveryTypeId: string,
    price: string,
    subtitle: string,
    title: string
}

export interface PaymentMethods extends Generic {
    active: boolean,
    paymentMethodId: string,
    pocPaymentMethodId: string,
    subtitle: string,
    title: string
}

export interface Phone extends Generic {
    phoneNumber: string
}

export interface WorkDay extends Generic{
    active: boolean,
    weekDay: number,
    workingInterval: WorkingInterval[]
}

export interface WorkingInterval extends Generic {
    closingTime: string,
    openingTime: string
}

