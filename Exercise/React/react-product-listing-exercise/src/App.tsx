import {Context, createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {Container} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from "./Utility/CustomHooks/fetchData.tsx";
import Cart from "./Pages/Cart/Cart.tsx";
import Navbar from "./Components/Navbar/Navbar.tsx";
import Login from "./Pages/Login/Login.tsx";
import Admin from "./Pages/Intro/Admin.tsx";
import Moderator from "./Pages/Intro/Moderator.tsx";
import User from "./Pages/Intro/User.tsx";
import ProductForm from "./Pages/AddNewProduct/ProductForm.tsx";
import PageNotFound from "./Components/PageNotFound.tsx";
import ProtectedRouteWrapper from "./Components/ProtectedRoute.tsx";
import {IFetched} from "./Types/UtilityTypes.tsx";

export const UserContext: Context<[string, Dispatch<SetStateAction<string>>, number]>
    = createContext<[string, Dispatch<SetStateAction<string>>, number]>(["", () => {
}, 0]);

function App() {
    const [currentUser, setCurrentUser] = useState("");
    const [userID, setUserID] = useState(0);

    const users : IFetched<{ users : { username: string; id: number}[] }>  = useFetch(`https://dummyjson.com/users`);
    const usersByUsername : Record<string, number> | undefined = users?.data?.users.reduce((acc : Record<string, number> , user : {username : string, id : number}) => {
        acc[user.username] = user.id;
        return acc;
    }, {});

    const localstorageValue = JSON.parse(localStorage.getItem(`${userID}`) as string);
    const userCart : IFetched<{carts : any}> = useFetch(currentUser !== "" && userID !== 0 && !localstorageValue
        ? `https://dummyjson.com/users/${userID}/carts` : ``);

    const [products, setProducts] = useState(localstorageValue || userCart?.data?.carts[0]?.products || []);
    useEffect(() => {
        const currID = currentUser && usersByUsername ? usersByUsername[currentUser] : 0;
        setUserID(() => currID);

        const localstorageValue = JSON.parse(localStorage.getItem(`${currID}`) as string);
        setProducts(localstorageValue || 0)
    }, [currentUser]);

    useEffect(() => {
        const localstorageValue = JSON.parse(localStorage.getItem(`${userID}`) as string);

        if (currentUser !== "" && usersByUsername && userID === usersByUsername[currentUser] && !userCart?.loading && userCart?.data?.carts[0]?.userId === userID) {
            const products = userCart?.data?.carts[0]?.products ? userCart?.data?.carts[0]?.products : userCart?.data?.carts;
            localStorage.setItem(`${userID}`, JSON.stringify(products ?? []));
            setProducts(products ?? []);
        } else if (currentUser !== "" && !localstorageValue && usersByUsername && userID === usersByUsername[currentUser] && !userCart?.loading && userCart?.data?.carts && !userCart?.data?.carts[0]?.userId) {
            localStorage.setItem(`${userID}`, JSON.stringify([]));
        }
    }, [userID, userCart]);

    enum Role {
        ADMIN = 'admin',
        MODERATOR = 'moderator',
        USER = 'user'
    }

    const allowedRoles: Record<string, Role[]> = {
        'navbar': [Role.ADMIN, Role.MODERATOR, Role.USER],
        'admin': [Role.ADMIN],
        'moderator': [Role.MODERATOR],
        'user': [Role.USER],
        'cart': [Role.ADMIN, Role.USER],
        'add-products': [Role.ADMIN, Role.MODERATOR],
    }
    return (
        <UserContext.Provider value={[currentUser, setCurrentUser, userID]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route
                        path="/"
                        element={
                            <ProtectedRouteWrapper
                                allowedRoles={allowedRoles.navbar}
                                component={
                                    <>
                                        <Navbar users={users} cartLength={products?.length}/>
                                        <Outlet/>
                                    </>}
                            />
                        }
                    >
                        <Route index
                               element={
                                <Container className={'mt-xxl-5'}>
                                    <h1>Hello</h1>
                                </Container>}
                        />
                        <Route path="admin"
                               element={
                            <ProtectedRouteWrapper allowedRoles={allowedRoles.admin}
                                                   component={<Admin setProducts={setProducts}/>}/>}/>

                        <Route path="moderator"
                               element={<ProtectedRouteWrapper allowedRoles={allowedRoles.moderator}
                                                               component={<Moderator setProducts={setProducts}/>}/>}/>

                        <Route path="user"
                               element={<ProtectedRouteWrapper allowedRoles={allowedRoles.user}
                                                       component={<User setProducts={setProducts}/>}/>}/>

                        <Route path="add-product"
                               element={<ProtectedRouteWrapper allowedRoles={allowedRoles["add-products"]}
                                                               component={<ProductForm/>}/>}/>

                        <Route path="cart"
                               element={<ProtectedRouteWrapper allowedRoles={allowedRoles.cart}
                                                               component={<Cart key={userID} loading={userCart?.loading}
                                                                    setProducts={setProducts}/>}/>}/>
                    </Route>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}
export default App