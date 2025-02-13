import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {observer} from "mobx-react-lite";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductForm from "./Components/ProductForm.tsx";
import ProductTable from "./Components/ProductTable.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <ProductForm />}/>
                <Route path={"/product-table"} element={<ProductTable/> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default observer(App)
