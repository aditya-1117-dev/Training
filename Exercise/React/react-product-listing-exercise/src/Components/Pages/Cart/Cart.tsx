import useFetch from "../../Utility/CustomHooks/fetchData.tsx";
import { useState} from "react";
import {Container} from "reactstrap";
import DropdownComponent from "../../Utility/Dropdown/Dropdown.tsx";
import LoadingComponent from "../../Utility/Loader/Spinner.tsx";
import ListProducts from "../../Utility/ProductListing/ListProducts.tsx";

const Cart = (  ) =>{
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const users = useFetch(`https://dummyjson.com/users`, updateLoadingStatus);

    const usersByUsername = users?.data?.users.reduce((acc, user) => {
        acc[user.username] = user.id;
        return acc;
    }, {} );
    const usernames = users?.data?.users.map(user => user.username)

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState("5");

    const userCart = currentUser !== ""
        ? useFetch(`https://dummyjson.com/users/${usersByUsername[currentUser]}/carts`, updateLoadingStatus)
        : useFetch(``, updateLoadingStatus);

    const showProducts = userCart?.data === null
        ? JSON.parse( localStorage.getItem(`${0}`) as string )
        : userCart?.data?.carts[0]?.products;

    // console.log(showProducts.slice((currentPage-1)*Number(limit), (currentPage-1)*Number(limit) + Number(limit) ) )
    // console.log(userCart ,showProducts);
    // console.log(JSON.parse( localStorage.getItem(`${0}`) as string ));

    const totalPages = currentUser !== ""
        ? (Math.ceil( Object.keys(userCart).length / Number(limit)) )
        : (Math.ceil( (showProducts?.length) || 0 / Number(limit) ));

    // console.log(userCart ,totalPages, limit, showProducts.length, Math.ceil( showProducts.length / Number(limit) ))

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

            {!userCart && showProducts && showProducts.length === 0
                ? <LoadingComponent width={100} height={100}/>
                : <ListProducts
                    showProducts={ currentUser === ""
                        ? showProducts?.slice( (currentPage-1)*Number(limit), (currentPage-1)*Number(limit) + Number(limit) )
                        : showProducts}
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