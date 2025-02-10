import {FormStore} from "../Stores/formStore.tsx";
import {createContext} from "react";


export interface IStoreData {
    firstName: string,
    name: string,
    age: number,
    country: string[],
    select: "abc" | "bcd" | "efg",
    gender: "Male" | "Female",
    jsonObjectInput : [string[], "Male" | "Female", string, number, "first" | "second" | "third"],
    jsonStringField : string[],
    jsonNumberField : number[]
}
const FormData : IStoreData = {
    firstName: "A",
    name: "Adi",
    age: 10,
    select: "efg",
    gender: "Male",
    country: ["IND"],
    jsonObjectInput : [["IND"],"Male","Adi", 1, "first",],
    jsonStringField : ["a", "b"],
    jsonNumberField : [1, 2, 3, 4],
}
export const formStore = new FormStore<IStoreData>(FormData);
formStore.setOnSubmitCallBack(() => console.log("on submit call"));

export const FormStoreContext = createContext<FormStore<IStoreData>>(formStore);