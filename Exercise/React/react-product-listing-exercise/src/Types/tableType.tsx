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

export interface IFetchedProducts {
    data : {
        limit : number | undefined,
        skip : number | undefined,
        total : number | undefined,
        products : IProduct[] | undefined
    } | null,
    error : string | null,
    loading : boolean
}