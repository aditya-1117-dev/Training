import {IProduct} from "../../Types/UtilityTypes.tsx";
import { Col, Row} from "reactstrap";
import PaginationComponent from "../Pagination/Pagination.tsx";
import ProductCard from "./ProductCard.tsx";
import {IListProducts} from "../../Types/returnTypes.tsx";
import Loader from "../Loader.tsx";
import DropdownItems from "../DropdownItems.tsx";

export default function ListProducts({ loading, totalPages, products, currentPage, setCurrentPage, limit, setLimit} : IListProducts ) {
    function onPageChange(page : number) {
        setCurrentPage(page % (totalPages+1));
    }
    const setLimitArray = [];
    for (let idx = 5; idx <= 50; idx += 5) {
        setLimitArray.push(idx.toString());
    }
    return (
        <Col md={8} style={{ margin: "0 auto" }}>
            {loading? <Loader height={100} width={100} /> :
                !products || products.length === 0 ? <Row className="bold justify-content-center"> No Products Available</Row> :
                products.map((product : IProduct) =><ProductCard key={product.id+product.title} product={product} /> )
            }
            <Row className="mb-3">
                <Col md={5}>
                    <PaginationComponent currentPage={currentPage  % (totalPages+1)} onPageChange={onPageChange} totalPages={totalPages}/>
                </Col>
                <Col md={1}>
                    <DropdownItems baseValue="Select Number of Products to show" list={setLimitArray} selectedItem={limit} setSelectedItem={setLimit} />
                </Col>
            </Row>
        </Col>
    )
}