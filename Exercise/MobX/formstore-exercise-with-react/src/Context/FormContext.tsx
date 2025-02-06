import {FormStore} from "../Stores/formStore.tsx";
import {createContext} from "react";
import {IFormStore} from "../App.tsx";

const formStore = new FormStore<IFormStore>({} as IFormStore);

export const FormStoreContext = createContext<FormStore<IFormStore>>(formStore);