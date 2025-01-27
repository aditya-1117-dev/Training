import {IProduct} from "../../Types/UtilityTypes.tsx";
import { Col, Row} from "reactstrap";
import {useState} from "react";
import PaginationComponent from "../Pagination/Pagination.tsx";
import ProductCard from "./ProductCard.tsx";

export default function ListProducts({ products, productsPerPage} : { products : IProduct[], productsPerPage : number}) {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginatedProducts = products.slice( (currentPage-1)*productsPerPage, currentPage*productsPerPage);
    function onPageChange(page : number) {
        setCurrentPage(page);
    }
    return (
        <Col md={8} style={{ margin: "0 auto" }}>
            {paginatedProducts.length ===0 ? <Row className="bold justify-content-center"> No Products Available</Row> :
                <PaginationComponent  currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages}/>
            }
            {paginatedProducts && paginatedProducts.map((product : IProduct) =><ProductCard key={product.id} product={product} /> )}
        </Col>
    )
}