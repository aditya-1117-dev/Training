import {Dispatch, SetStateAction} from "react";
import {IProduct} from "./UtilityTypes.tsx";
// import {IFetchedProducts} from "./UtilityTypes.tsx";

export interface IListProducts {
    limit : number;
    setLimit : Dispatch<SetStateAction<string>>;
    totalPages : number,
    showProducts : IProduct[] | undefined,
    currentPage : number;
    setCurrentPage : Dispatch<SetStateAction<number>>;
    loading : boolean
}