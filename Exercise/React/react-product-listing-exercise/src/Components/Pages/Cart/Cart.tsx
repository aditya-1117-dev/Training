import {useContext, useState} from "react";
import LoadingComponent from "../../Utility/Loader/Spinner.tsx";
import ListProducts from "../../Utility/ProductListing/ListProducts.tsx";
import {UserContext} from "../../../App.tsx";
import {Container} from "reactstrap";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";

const Cart = ({loading} : {loading : boolean}) =>{
    const [, , userID] = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState("5");
    // const showProducts = JSON.parse( localStorage.getItem(`${userID}`) as string || `[]` );
    // const totalPages = Math.ceil( showProducts?.length / Number(limit) ) || 0;

    const localStorageValue = JSON.parse( localStorage.getItem(`${userID}`) as string );

    const userCart = useFetch(userID !== 0 && !localStorageValue ? `https://dummyjson.com/users/${userID}/carts` : "");

    const showProducts = localStorageValue || [];
    const totalPages = Math.ceil( (userCart?.data?.carts[0]?.products?.length > showProducts.length
                                        ? userCart?.data?.carts[0]?.products?.length > showProducts.length
                                        : showProducts.length ) / Number(limit) ) || 0;

    const startIdx = (currentPage-1)*Number(limit);

    return (
        <Container>
            {!showProducts && userCart?.loading
                ? <LoadingComponent width={100} height={100}/>
                : <ListProducts
                    showProducts={ userCart?.data?.carts[0]?.products?.length > showProducts.length
                        ? userCart?.data?.carts[0]?.products.slice(startIdx, startIdx+limit)
                        : showProducts?.slice( startIdx, startIdx + Number(limit) ) }
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