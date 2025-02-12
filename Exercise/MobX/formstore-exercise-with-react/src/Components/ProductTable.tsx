import ListTable from "./ListTable.tsx";
import {ListTableStoreContext} from "../Context/ListTableContext.tsx";
import ListTableStore from "../Stores/ListTableStore.tsx";
import {IFetchedProducts} from "../types/tableType.tsx";

const baseUrl: string = `https://dummyjson.com/products`;
export const ProductTableStore: ListTableStore<IFetchedProducts> = new ListTableStore<IFetchedProducts>(baseUrl);

export default function ProductTable() {
    const columns = [{name: "title", display: "Product Title"}, {
        name: "description",
        display: "Description"
    }, {name: "price", display: "Price"}, {name: "thumbnail", display: "Image"}];
    return (
        <ListTableStoreContext.Provider value={ProductTableStore}>
            <ListTable columns={columns} name={"products"}/>
        </ListTableStoreContext.Provider>
    )
}