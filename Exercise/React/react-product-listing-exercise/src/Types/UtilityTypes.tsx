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