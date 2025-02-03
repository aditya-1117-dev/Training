import {Dispatch, SetStateAction} from "react";
import {IProduct} from "./UtilityTypes.tsx";

export interface IListProducts {
    limit : number;
    setLimit : Dispatch<SetStateAction<number>>;
    totalPages : number,
    products : IProduct[] | undefined,
    currentPage : number;
    setCurrentPage : Dispatch<SetStateAction<number>>;
    loading : boolean
}