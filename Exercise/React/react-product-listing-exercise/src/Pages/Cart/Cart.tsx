import {Dispatch, SetStateAction, useContext, useState} from "react";
import ListProducts from "../../Components/ProductListing/ListProducts.tsx";
import {UserContext} from "../../App.tsx";
import {Container} from "reactstrap";
import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import Loader from "../../Components/Loader/Loader.tsx";
import {ICart, IFetched, IProduct} from "../../Types/UtilityTypes.tsx";

const Cart = ({loading, setProducts}: { loading: boolean, setProducts: Dispatch<SetStateAction<IProduct[]>> }) => {
    const { userID } = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(2);
    const localStorageValue = JSON.parse(localStorage.getItem(`${userID}`) as string);
    const userCart : IFetched<{carts : ICart[] }> = useFetch(userID !== 0 && !localStorageValue ? `https://dummyjson.com/users/${userID}/carts` : "");
    const localStorageProducts = localStorageValue || [];

    const userCartProductsLength = userCart?.data?.carts[0]?.products?.length || 0;

    const totalPages = Math.ceil((userCartProductsLength > localStorageProducts.length
        ? userCartProductsLength
        : localStorageProducts.length) / limit) || 0;
    const startIdx = (currentPage - 1) * limit;

    const cartProducts = userCartProductsLength > localStorageProducts.length
        ? userCart?.data?.carts[0]?.products?.slice(startIdx, startIdx + limit)
        : localStorageProducts?.slice(startIdx, startIdx + limit)

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