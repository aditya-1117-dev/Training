import {createContext} from "react";
import ListTableStore from "../Stores/ListTableStore.tsx";
import {IFetchedProducts} from "../types/tableType.tsx";

const listTableStore : ListTableStore<IFetchedProducts> = new ListTableStore<IFetchedProducts>();

export const ListTableStoreContext = createContext<ListTableStore<IFetchedProducts>>(listTableStore);