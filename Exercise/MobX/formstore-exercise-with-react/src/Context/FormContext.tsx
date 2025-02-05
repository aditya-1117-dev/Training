import {FormStore, formStore} from "../Stores/formStore.tsx";
import {createContext} from "react";

export const FormStoreContext = createContext<FormStore>(formStore);