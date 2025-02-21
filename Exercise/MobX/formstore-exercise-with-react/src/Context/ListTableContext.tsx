import {createContext} from "react";
import ListTableStore from "../Stores/ListTableStore.tsx";
import { IProduct} from "../types/tableType.tsx";

const baseUrl: string = ``;
export const listTableStore : ListTableStore<IProduct> = new ListTableStore<IProduct>(baseUrl);

export const ListTableStoreContext = createContext<ListTableStore<IProduct>>(listTableStore);