import ListTable from "./ListTable.tsx";
import {ListTableStoreContext} from "../Context/ListTableContext.tsx";
import ListTableStore from "../Stores/ListTableStore.tsx";
import {Link} from "react-router-dom";
import {CardImg} from "reactstrap";
import {IProduct} from "../types/tableType.tsx";

const baseUrl: string = `https://dummyjson.com/products`;
export const ProductTableStore: ListTableStore<IProduct> = new ListTableStore<IProduct>(baseUrl, "products", 5);

export default function ProductTable() {
    const columns = [
        { name: "title", display: "Product Title" },
        { name: "description", display: "Description",
            render: (row : any) => row?.description.length > 90 ? `${row?.description.slice(0, 90)}...` : row?.description },
        { name: "price", display: "Price" },
        { name: "thumbnail", display: "Image",
            render: ( row: any) => <CardImg src={row?.thumbnail} alt={row?.title} style={{ width: "8em", height: "8em" }} /> },
        { name: "dimensions", display: "Width",
            render: ( row: any) => row?.dimensions?.width }, // Nested object rendering
        { name: "dimensions.height", display: "Height"} // Nested object rendering from st
    ];

    return (
        <>
            <Link to={"/"}>
                Link to Add Product Page
            </Link> <br/> <br/>

            <ListTableStoreContext.Provider value={ProductTableStore}>
                <ListTable columns={columns} name={"products"}/>
            </ListTableStoreContext.Provider>
        </>
    )
}