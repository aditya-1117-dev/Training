import {FormStore} from "../Stores/formStore.tsx";
import {createContext} from "react";


export interface IProductData {
    firstName: string,
    name: string,
    age: number,
    country: string[],
    select: "abc" | "bcd" | "efg",
    gender: "Male" | "Female",
    stringField : string[],
    numberField : number[],
}
const FormData : IProductData = {
    firstName: "A",
    name: "Adi",
    age: 10,
    select: "efg",
    gender: "Male",
    country: ["IND"],
    stringField : ["a", "b"],
    numberField : [1, 2, 3, 4],
}
export const formStore = new FormStore<IProductData>(FormData);
formStore.setOnSubmitCallBack(() => {});

export const FormStoreContext = createContext<FormStore<IProductData>>(formStore);