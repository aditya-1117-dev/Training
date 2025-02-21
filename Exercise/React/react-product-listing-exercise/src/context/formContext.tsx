import {createContext} from "react";
import {FormStore} from "../stores/formStore.tsx";

export const formStoreContext = createContext<FormStore<any>>( {} as FormStore<any>);