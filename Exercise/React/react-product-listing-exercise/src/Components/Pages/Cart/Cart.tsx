import {useContext, useState} from "react";
import ListProducts from "../../Utility/ProductListing/ListProducts.tsx";
import {UserContext} from "../../../App.tsx";
import {Container} from "reactstrap";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import Loader from "../../Utility/Loader/Loader.tsx";

const Cart = ({loading}: { loading: boolean }) => {
    const [, , userID] = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const localStorageValue = JSON.parse(localStorage.getItem(`${userID}`) as string);
    const userCart = useFetch(userID !== 0 && !localStorageValue ? `https://dummyjson.com/users/${userID}/carts` : "");
    const localStorageProducts = localStorageValue || [];
    const totalPages = Math.ceil((userCart?.data?.carts[0]?.products?.length > localStorageProducts.length
        ? userCart?.data?.carts[0]?.products?.length > localStorageProducts.length
        : localStorageProducts.length) / limit) || 0;
    const startIdx = (currentPage - 1) * limit;

    const cartProducts = userCart?.data?.carts[0]?.products?.length > localStorageProducts.length
        ? userCart?.data?.carts[0]?.products.slice(startIdx, startIdx + limit)
        : localStorageProducts?.slice(startIdx, startIdx + limit)

    const [products, setProducts] = useState(cartProducts);

    return (
        <Container>
            {!localStorageProducts && userCart?.loading
                ? <Loader width={100} height={100}/>
                : <ListProducts
                    products={cartProducts}
                    setProducts={setProducts}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    limit={Number(limit)}
                    setLimit={setLimit}
                    loading={loading}/>
            }
        </Container>
    );
}

export default Cart;