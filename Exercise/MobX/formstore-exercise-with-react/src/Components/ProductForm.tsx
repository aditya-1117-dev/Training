import {CheckField, JSONField, NumberField, RadioField, SelectField, StringField} from "./InputFields.tsx";
import Form from "./Form.tsx";
import {FormStore} from "../Stores/formStore.tsx";

export interface IProductData {
    productName: string,
    price: number,
    country: string[],
    category: "beauty" | "mobile" | "laptop",
    gender: "Male" | "Female",
    stringField : string[],
    numberField : number[],
}
export const formData : IProductData = {
    productName: "",
    price: 3,
    category: "mobile",
    gender: "Male",
    country: ["IND"],
    stringField : ["a", "b"],
    numberField : [1, 2, 3, 4],
}
export const formStore = new FormStore<IProductData>(formData);
formStore.setOnSubmitCallBack(( data : any) => data);

export default function ProductForm() {
    const selectFieldOptions = [{value: '', label: 'Select Category'}, {value: 'beauty', label: 'BEAUTY'},
        {value: 'mobile', label: 'MOBILE'}, {value: 'laptop', label: 'LAPTOP'}]
    const radioFieldOptions = [{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}]
    const checkFieldOptions = [{value: 'IND', label: 'IND'}, {value: 'UK', label: 'UK'}]
    return (
        <Form showResetButton={true} showSaveButton={false} formStore={formStore}>
            <JSONField name="stringField" required={true}
                       renderField={(value: string, index: number, name: keyof IProductData, required: boolean) => (
                           <StringField name={name} label={index === 0 ? "String Input" : ""} index={index}
                                        required={required} value={value} key={index} />)}/>

            <JSONField name="numberField" required={true}
                       renderField={(value: number, index: number, name: keyof IProductData, required: boolean) => (
                           <NumberField name={name} label={index === 0 ? "Number Input" : ""} index={index}
                                        required={required} value={value} key={index} />)}/>

            <StringField name="productName" label="Product Name" required={true} min={2} max={5}/>
            <NumberField name="price" label="Price of the product" required={true} min={2} max={5}/>
            <SelectField label="Select Category of product :" name="category" required={true} options={selectFieldOptions}/>
            <RadioField label="Gender" name="gender" required={true} options={radioFieldOptions}/>
            <CheckField label="Country" name="country" required={true} options={checkFieldOptions}/>
        </Form>
    )
}