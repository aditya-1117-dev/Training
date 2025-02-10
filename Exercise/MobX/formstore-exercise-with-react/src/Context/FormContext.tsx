import {FormStore} from "../Stores/formStore.tsx";
import {createContext} from "react";
import {IStoreData} from "../App.tsx";

const formStore = new FormStore<IStoreData>({} as IStoreData);

export const FormStoreContext = createContext<FormStore<IStoreData>>(formStore);