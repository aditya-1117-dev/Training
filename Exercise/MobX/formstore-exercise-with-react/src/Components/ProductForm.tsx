import {CheckField, NumberField, RadioField, SelectField, StringField} from "./InputFields.tsx";
import Form from "./Form.tsx";
import {FormStore} from "../Stores/formStore.tsx";
import StringInput from "./InputFields/StringInput.tsx";
import {observer} from "mobx-react-lite";
import NumberInput from "./InputFields/NumberInput.tsx";
import {JSONField} from "./JSONFields.tsx";

export interface IProductData {
    productName: string,
    productDescription : string,
    name : string,
    imageLink : string,
    price: number,
    country: string[],
    category: "beauty" | "mobile" | "laptop",
    gender: "Male" | "Female",
    stringField : string[],
    numbers : number[],
}
export const formData : IProductData = {
    productName: "",
    imageLink: "",
    productDescription : "",
    name : "",
    price: 10,
    category: "mobile",
    gender: "Male",
    country: ["IND"],
    stringField : ["a", "b"],
    numbers : [1,2,3]
}
export const formStore = new FormStore<IProductData>(formData);
formStore.setOnSubmitCallBack(( data : any) => {
    const storedProducts = JSON.parse(localStorage.getItem(`${0}`) || "[]");
    if (data) storedProducts.push({...data});
    localStorage.setItem(`${0}`,JSON.stringify(storedProducts) )
});

function ProductForm() {
    const selectFieldOptions = [{value: '', label: 'Select Category'}, {value: 'beauty', label: 'BEAUTY'},
        {value: 'mobile', label: 'MOBILE'}, {value: 'laptop', label: 'LAPTOP'}]
    const radioFieldOptions = [{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}]
    const checkFieldOptions = [{value: 'IND', label: 'IND'}, {value: 'UK', label: 'UK'}]
    return (
        <Form showResetButton={true} showSaveButton={false} formStore={formStore}>
            <StringField name="productName" label="Product Name" required={true} min={2} max={5}/>
            <StringField name="productDescription" label="Product Description" required={true} min={2} max={40}/>
            <NumberField name="price" label="Price of the product" required={true} min={10} max={50}/>
            <StringField name="imageLink" label="Image Link" required={false} />

            <JSONField name="stringField" required={true} label={"String Input"}
                       RenderField={(props : any) => <StringInput {...props} /> }/>
            <JSONField name="numbers" required={true} label={"Number Input"}
                       RenderField={(props : any) => <NumberInput {...props} /> }/>

            <SelectField label="Select Category of product :" name="category" required={true} options={selectFieldOptions}/>
            <RadioField label="Gender" name="gender" required={true} options={radioFieldOptions}/>
            <CheckField label="Country" name="country" required={true} options={checkFieldOptions}/>
        </Form>
    )
}
export default observer(ProductForm)