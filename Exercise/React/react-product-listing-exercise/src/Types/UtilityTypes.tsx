import {ChangeEvent} from "react";

export interface IuseFromInput {
    value : string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface IFetched<T> {
    data : null | T,
    error : string | null,
    loading : boolean
}

export interface IFetchedCategories {
    data : null | {
        data : string[],
        error : string,
        loading : boolean
    },
    error : string | null,
}
export interface IFetchedProducts {
    data : null | {
        limit : number | undefined,
        skip : number | undefined,
        total : number | undefined,
        products : IProduct[] | undefined
    },
    error : string | null,
    loading : boolean
}

export interface Ispinner{
    height:number,
    width : number
}

interface IReview {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}
interface IMeta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}
export interface IProduct {
    quantity? : number;
    id: number;
    title: string;
    brand: string;
    category: string;
    description: string;
    dimensions: {
        depth: number;
        height: number;
        width: number;
    };
    discountPercentage: number;
    price: number;
    availabilityStatus: string;
    rating: number;
    returnPolicy: string;
    reviews: IReview[];
    shippingInformation: string;
    sku: string;
    stock: number;
    tags: string[];
    images: string[];
    thumbnail: string;
    minimumOrderQuantity: number;
    weight: number;
    warrantyInformation: string;
    meta: IMeta;
}
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: object;
    ip: string;
    address: object;
    macAddress: string;
    university: string;
    bank: object;
    company: object;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: object;
    role: string;
}

export interface ICart {
    id: number;
    products: IProduct[] | undefined;
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}