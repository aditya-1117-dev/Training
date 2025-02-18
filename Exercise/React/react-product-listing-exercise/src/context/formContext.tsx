import {createContext} from "react";
import {FormStore} from "../stores/formStore.tsx";
import {IProductData} from "../Pages/AddNewProduct/ProductForm.tsx";

export const formStoreContext = createContext<FormStore<IProductData>>( {} as FormStore<IProductData>);