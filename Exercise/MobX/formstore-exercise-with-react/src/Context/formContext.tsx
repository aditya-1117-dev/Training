import {FormStore} from "../Stores/formStore.tsx";
import {createContext} from "react";
import {IProductData} from "../Components/ProductForm.tsx";

export const formStoreContext = createContext<FormStore<IProductData>>( {} as FormStore<IProductData>);