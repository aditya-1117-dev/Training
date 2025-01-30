import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Home from "./Components/Pages/Home/Home.tsx";
import Cart from "./Components/Pages/Cart/Cart.tsx";
import NavbarComponent from "./Components/Utility/Navbar/Navbar.tsx";
import {Context, createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import useFetch from "./Components/Utility/CustomHooks/fetchData.tsx";
import LoadingComponent from "./Components/Utility/Loader/Spinner.tsx";

export const UserContext : Context<[string, Dispatch<SetStateAction<string>>, number]> = createContext<[string, Dispatch<SetStateAction<string>>, number]>("");

function App() {
    const [currentUser, setCurrentUser] = useState("");
    const [userID, setUserID] = useState(0);

    const users = useFetch(`https://dummyjson.com/users`);
    const usersByUsername = users?.data?.users.reduce((acc, user) => {
        acc[user.username] = user.id;
        return acc;
    }, {} );

    const userCart = useFetch(currentUser !== "" && userID !== 0 ?`https://dummyjson.com/users/${userID}/carts` : ``)

    useEffect(() => {
        const currID =  currentUser? usersByUsername[currentUser] : 0;
        setUserID( currID);
    }, [currentUser]);

    useEffect( () => {
        if (currentUser !== "" && userID===userCart?.data?.carts[0]?.userId && userCart?.data?.carts[0]?.products ) {
            localStorage.setItem(`${userID}`, JSON.stringify(userCart.data.carts[0].products) );
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
                            {userCart?.loading
                                ?  <LoadingComponent width={100} height={100}/>
                                :<Cart loading={userCart?.loading}/>
                            }
                        </>,
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
