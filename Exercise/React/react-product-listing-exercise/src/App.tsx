import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Components/Pages/Home/Home.tsx";
import Cart from "./Components/Pages/Cart/Cart.tsx";
import NavbarComponent from "./Components/Utility/Navbar/Navbar.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Home />
        ),
    },
    {
        path: "cart",
        element: <Cart />,
    },
]);

function App() {

  return (
    <>
        <NavbarComponent />
        <RouterProvider router={router} />
    </>
  )
}

export default App
