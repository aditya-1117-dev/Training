import {Dispatch, SetStateAction} from "react";
import {IFetchedProducts} from "./UtilityTypes.tsx";

export interface IListProducts {
    selectedItem :string;
    limit : number;
    setLimit : Dispatch<SetStateAction<string>>;
    paginatedProducts: IFetchedProducts;
    currentPage : number;
    setCurrentPage : Dispatch<SetStateAction<number>>
}