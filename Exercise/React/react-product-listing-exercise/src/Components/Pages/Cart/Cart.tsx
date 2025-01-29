import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import { useState} from "react";
import {Container} from "reactstrap";
import DropdownComponent from "../../Utility/Dropdown/Dropdown.tsx";
import LoadingComponent from "../../Utility/Loader/Spinner.tsx";
import ListProducts from "../../Utility/ProductListing/ListProducts.tsx";

const Cart = () =>{
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const users = useFetch(`https://dummyjson.com/users`, updateLoadingStatus);

    const usersByUsername = users?.data?.users.reduce((acc, user) => {
        acc[user.username] = user.id;
        return acc;
    }, {} );

    const userCartUrl = currentUser !== ""
        ? `https://dummyjson.com/users/${usersByUsername[currentUser]}/carts`
        : ``;

    const userCart = useFetch(userCartUrl, updateLoadingStatus);
    const usernames = users?.data?.users.map(user => user.username)

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState("5");

    const totalPages = userCart? (Math.ceil( Object.keys(userCart).length / Number(limit)) ) : 0;
    const showProducts = userCart?.data?.carts[0]?.products;

    function updateLoadingStatus(status: boolean){
        setLoading(status);
    }

    return (
        <>
            <Container>
                <DropdownComponent
                    baseValue="Select the User"
                    list={usernames}
                    selectedItem={currentUser}
                    setSelectedItem={setCurrentUser} />
            </Container>

            {!userCart
                ? <LoadingComponent width={100} height={100}/>
                : <ListProducts
                    showProducts={showProducts}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    limit={Number(limit)}
                    setLimit={setLimit}
                    loading={loading} />
            }
        </>
    );
}

export default Cart;