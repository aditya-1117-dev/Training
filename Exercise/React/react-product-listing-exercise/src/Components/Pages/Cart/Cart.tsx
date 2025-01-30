import {useContext, useState} from "react";
import LoadingComponent from "../../Utility/Loader/Spinner.tsx";
import ListProducts from "../../Utility/ProductListing/ListProducts.tsx";
import {UserContext} from "../../../App.tsx";
import {Container} from "reactstrap";

const Cart = ({loading} : {loading : boolean}) =>{
    const [, , userID] = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState("5");
    const showProducts = JSON.parse( localStorage.getItem(`${userID}`) as string ) || [];
    const totalPages = Math.ceil( showProducts?.length / Number(limit) ) || 0;

    return (
        <Container>
            {!showProducts
                ? <LoadingComponent width={100} height={100}/>
                : <ListProducts
                    showProducts={showProducts?.slice( (currentPage-1)*Number(limit), (currentPage-1)*Number(limit) + Number(limit) )}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    limit={Number(limit)}
                    setLimit={setLimit}
                    loading={loading} />
            }
        </Container>
    );
}

export default Cart;