import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "./Components/Pages/Home/Home.tsx";
import Cart from "./Components/Pages/Cart/Cart.tsx";

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
        <RouterProvider router={router} />
    </>
  )
}

export default App
