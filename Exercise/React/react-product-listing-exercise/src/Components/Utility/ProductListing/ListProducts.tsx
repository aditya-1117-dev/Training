import {IProduct, IuseFetch} from "../../Types/UtilityTypes.tsx";
import { Col, Row} from "reactstrap";
import {Dispatch, SetStateAction, useState} from "react";
import PaginationComponent from "../Pagination/Pagination.tsx";
import ProductCard from "./ProductCard.tsx";
import useFetch from "../CustomHooks/fetchData.tsx";
import DropdownComponent from "../Dropdown/Dropdown.tsx";

export default function ListProducts({ products, query, selectedItem, limit, setLimit} : { products : IProduct[], query:string, selectedItem :string, limit : number , setLimit : Dispatch<SetStateAction<string>>}) {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / limit);

    const paginatedProducts : IuseFetch = useFetch(query===""? `https://dummyjson.com/products?limit=${limit}&skip=${(currentPage-1)*limit}` :
        `https://dummyjson.com/products${query}&limit=${limit}&skip=${(currentPage-1)*limit}`);

    const showProducts : IProduct[] = (selectedItem==="")? paginatedProducts?.data?.products :
        paginatedProducts?.data?.products?.filter((product : IProduct )=> product.category ===selectedItem);

    function onPageChange(page : number) {
        setCurrentPage(page);
    }

    const limitArray = [];
    for (let idx = 5; idx <= 50; idx += 5) {
        limitArray.push(idx.toString());
    }

    return (
        <Col md={8} style={{ margin: "0 auto" }}>
            <Row className="mb-3">
                <PaginationComponent currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages}/>
                <DropdownComponent baseValue="Select Number of Products to show" list={limitArray} selectedItem={limit} setSelectedItem={setLimit} />
            </Row>
            {!showProducts || showProducts.length === 0 ? <Row className="bold justify-content-center"> No Products Available</Row> :
                showProducts.map((product : IProduct) =><ProductCard key={product.id} product={product} /> )
            }
        </Col>
    )
}