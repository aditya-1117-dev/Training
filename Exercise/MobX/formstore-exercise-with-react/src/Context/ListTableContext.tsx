import {createContext} from "react";
import ListTableStore from "../Stores/ListTableStore.tsx";
import {IFetchedProducts} from "../types/tableType.tsx";

const baseUrl: string = ``;
export const listTableStore : ListTableStore<IFetchedProducts> = new ListTableStore<IFetchedProducts>(baseUrl);

export const ListTableStoreContext = createContext<ListTableStore<IFetchedProducts>>(listTableStore);