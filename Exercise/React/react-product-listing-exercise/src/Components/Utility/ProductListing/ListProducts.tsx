import {IProduct} from "../../Types/UtilityTypes.tsx";
import { Col, Row} from "reactstrap";
import PaginationComponent from "../Pagination/Pagination.tsx";
import ProductCard from "./ProductCard.tsx";
import DropdownComponent from "../Dropdown/Dropdown.tsx";
import LoadingComponent from "../Loader/Spinner.tsx";
import {IListProducts} from "../../Types/returnTypes.tsx";

export default function ListProducts({ paginatedProducts, currentPage, setCurrentPage, selectedItem, limit, setLimit} : IListProducts ) {
    const totalPages = Math.ceil( paginatedProducts?.data?.total?? 0 / limit );
    const showProducts : IProduct[] | undefined = ( selectedItem==="" )? paginatedProducts?.data?.products :
        paginatedProducts?.data?.products?.filter((product : IProduct )=> product.category ===selectedItem);

    function onPageChange(page : number) {
        setCurrentPage(page % (totalPages+1));
    }
    const setLimitArray = [];
    for (let idx = 5; idx <= 50; idx += 5) {
        setLimitArray.push(idx.toString());
    }
    return (
        <Col md={8} style={{ margin: "0 auto" }}>
            <Row className="mb-3">
                <PaginationComponent currentPage={currentPage  % (totalPages+1)} onPageChange={onPageChange} totalPages={totalPages}/>
                <DropdownComponent baseValue="Select Number of Products to show" list={setLimitArray} selectedItem={limit} setSelectedItem={setLimit} />
            </Row>
            {paginatedProducts.loading? <LoadingComponent height={100} width={100} /> :
                !showProducts || showProducts.length === 0 ? <Row className="bold justify-content-center"> No Products Available</Row> :
                showProducts.map((product : IProduct) =><ProductCard key={product.id} product={product} /> )
            }
        </Col>
    )
}