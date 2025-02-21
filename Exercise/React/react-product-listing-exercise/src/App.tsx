import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Cart from "./Pages/Cart/Cart.tsx";
import NavbarComponent from "./Components/Navbar/Navbar.tsx";
import {Context, createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import useFetch from "./Utility/CustomHooks/fetchData.tsx";
import Login from "./Pages/Login/Login.tsx";
import ProtectedRoute from "./Components/ProtectedRoute.tsx";
import {Container} from "reactstrap";
import Admin from "./Pages/Intro/Admin.tsx";
import Moderator from "./Pages/Intro/Moderator.tsx";
import User from "./Pages/Intro/User.tsx";
import ProductForm from "./Pages/AddNewProduct/ProductForm.tsx";
import PageNotFound from "./Components/PageNotFound.tsx";

export const UserContext : Context<[string, Dispatch<SetStateAction<string>>, number]>
    = createContext<[string, Dispatch<SetStateAction<string>>, number]>(["", ()=>{}, 0]);

function App() {
    const [currentUser, setCurrentUser] = useState("");
    const [userID, setUserID] = useState(0);

    const users = useFetch(`https://dummyjson.com/users`);
    const usersByUsername = users?.data?.users.reduce((acc, user) => {
        acc[user.username] = user.id;
        return acc;
    }, {} );

    const localstorageValue = JSON.parse( localStorage.getItem(`${userID}`) as string );
    const userCart = useFetch(currentUser !== "" && userID !== 0 && !localstorageValue
        ?`https://dummyjson.com/users/${userID}/carts` : ``);

    const [products, setProducts] = useState(localstorageValue || userCart?.data?.carts[0]?.products || []);
    useEffect(() => {
        const currID =  currentUser? usersByUsername[currentUser] : 0;
        setUserID( () => currID);

        const localstorageValue = JSON.parse( localStorage.getItem(`${currID}`) as string );
        setProducts(localstorageValue || 0)
    }, [currentUser]);

    useEffect( () => {
        const localstorageValue = JSON.parse( localStorage.getItem(`${userID}`) as string );

        if (currentUser !== "" && userID === usersByUsername[currentUser] && !userCart?.loading && userCart?.data?.carts[0]?.userId === userID ) {
            const products = userCart?.data?.carts[0]?.products ? userCart?.data?.carts[0]?.products : userCart?.data?.carts;
            localStorage.setItem(`${userID}`, JSON.stringify(products?? []) );
            setProducts(products?? []);
        }else if( currentUser !== "" && !localstorageValue && userID === usersByUsername[currentUser] && !userCart?.loading && userCart?.data?.carts && !userCart?.data?.carts[0]?.userId){
            localStorage.setItem(`${userID}`, JSON.stringify([]) );
        }
    }, [userID, userCart]);

    enum Role {
        ADMIN = 'admin',
        MODERATOR = 'moderator',
        USER = 'user'
    }
    const allowedRoles : Record<string, Role[]> = {
        'navbar' : [Role.ADMIN, Role.MODERATOR, Role.USER],
        'admin' : [Role.ADMIN],
        'moderator' : [Role.MODERATOR],
        'user' : [Role.USER],
        'cart' : [Role.ADMIN, Role.USER],
        'add-products' : [Role.ADMIN, Role.MODERATOR],
    }
    return (
        <UserContext.Provider value={[currentUser, setCurrentUser, userID]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={
                        <ProtectedRoute allowedRoles={allowedRoles.navbar}>
                            <NavbarComponent users={users} cartLength={products?.length} />
                            <Outlet/>
                        </ProtectedRoute> }>
                        <Route index element={
                            <Container className={'mt-xxl-5'}>
                                <h1>Hello</h1>
                            </Container>} />
                        <Route path="admin" element={
                            <ProtectedRoute allowedRoles={allowedRoles.admin}>
                                <Admin setProducts={setProducts} />
                            </ProtectedRoute>} />
                        <Route path="moderator" element={
                            <ProtectedRoute allowedRoles={allowedRoles.moderator}>
                                <Moderator setProducts={setProducts} />
                            </ProtectedRoute>} />
                        <Route path="user" element={
                            <ProtectedRoute allowedRoles={allowedRoles.user}>
                                <User setProducts={setProducts} />
                            </ProtectedRoute>} />
                        <Route path="cart" element={
                            <ProtectedRoute allowedRoles={allowedRoles.cart}>
                                <Cart key={userID} loading={userCart?.loading} setProducts={setProducts} />
                            </ProtectedRoute>} />
                        <Route path="add-product" element={
                            <ProtectedRoute allowedRoles={allowedRoles["add-products"]}>
                                <ProductForm />
                            </ProtectedRoute>} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App
