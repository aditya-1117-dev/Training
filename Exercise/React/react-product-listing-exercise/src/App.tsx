import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Home from "./Pages/Home/Home.tsx";
import Cart from "./Pages/Cart/Cart.tsx";
import NavbarComponent from "./Components/Navbar/Navbar.tsx";
import {Context, createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import useFetch from "./Utility/CustomHooks/fetchData.tsx";
import ProductForm from "./Pages/AddNewProduct/ProductForm.tsx";

export const UserContext : Context<[string, Dispatch<SetStateAction<string>>, number]> = createContext<[string, Dispatch<SetStateAction<string>>, number]>(["", ()=>{}, 0]);

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

    useEffect(() => {
        const currID =  currentUser? usersByUsername[currentUser] : 0;
        setUserID( () => currID);
    }, [currentUser]);

    useEffect( () => {
        const localstorageValue = JSON.parse( localStorage.getItem(`${userID}`) as string );

        if (currentUser !== "" && userID === usersByUsername[currentUser] && !userCart?.loading && userCart?.data?.carts[0]?.userId === userID ) {
            const products = userCart?.data?.carts[0]?.products ? userCart?.data?.carts[0]?.products : userCart?.data?.carts;
            localStorage.setItem(`${userID}`, JSON.stringify(products?? []) );
        }else if( currentUser !== "" && !localstorageValue && userID === usersByUsername[currentUser] && !userCart?.loading && userCart?.data?.carts && !userCart?.data?.carts[0]?.userId){
            localStorage.setItem(`${userID}`, JSON.stringify([]) );
        }
    }, [userID, userCart]);

    const router = createBrowserRouter([
        {
            path: "/",
            element:
                <>
                    <NavbarComponent users={users}/>
                    <Outlet />
                </>,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/cart',
                    element:
                        <>
                            <Cart key={userID} loading={userCart?.loading}/>
                        </>,
                },
                {
                    path: '/add-product',
                    element: <ProductForm />,
                },
            ]
        }
    ]);
  return (
      <UserContext.Provider value={[currentUser, setCurrentUser, userID]}>
          <RouterProvider router={router} />
      </UserContext.Provider>
  )
}

export default App
