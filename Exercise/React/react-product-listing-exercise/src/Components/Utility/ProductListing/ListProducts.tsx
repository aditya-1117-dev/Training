import {IProduct, IuseFetch} from "../../Types/UtilityTypes.tsx";
import { Col, Row} from "reactstrap";
import {useState} from "react";
import PaginationComponent from "../Pagination/Pagination.tsx";
import ProductCard from "./ProductCard.tsx";
import useFetch from "../CustomHooks/fetchData.tsx";

export default function ListProducts({ products, productsPerPage, query, selectedItem} : { products : IProduct[], productsPerPage : number, query:string, selectedItem :string}) {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginatedProducts : IuseFetch = useFetch(query===""? `https://dummyjson.com/products?limit=${productsPerPage}&skip=${(currentPage-1)*productsPerPage}` :
        `https://dummyjson.com/products${query}&limit=${productsPerPage}&skip=${(currentPage-1)*productsPerPage}`);

    const showProducts : IProduct[] = (selectedItem==="")? paginatedProducts?.data?.products :
            paginatedProducts?.data?.products?.filter((product : IProduct )=> product.category ===selectedItem);

    function onPageChange(page : number) {
        setCurrentPage(page);
    }

    return (
        <Col md={8} style={{ margin: "0 auto" }}>
            <PaginationComponent  currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages}/>
            {!showProducts || showProducts.length === 0 ? <Row className="bold justify-content-center"> No Products Available</Row> :
                showProducts.map((product : IProduct) =><ProductCard key={product.id} product={product} /> )
            }
        </Col>
    )
}