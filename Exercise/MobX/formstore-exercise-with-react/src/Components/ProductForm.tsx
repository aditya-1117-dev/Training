import {CheckField, JSONField, NumberField, RadioField, SelectField, StringField} from "./InputFields.tsx";
import Form from "./Form.tsx";
import {IProductData} from "../Context/FormContext.tsx";

export default function ProductForm({formStore} : any) {
    const selectFieldOptions = [{value: 'null', label: 'Select the Value'}, {value: 'abc', label: 'abc'},
        {value: 'bcd', label: 'bcd'}, {value: 'efg', label: 'efg'}]
    const radioFieldOptions = [{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}]
    const checkFieldOptions = [{value: 'IND', label: 'IND'}, {value: 'UK', label: 'UK'}]
    return (
        <Form showResetButton={true} showSaveButton={true} formStore={formStore}>
            <JSONField name="stringField" required={true}
                       renderField={(value: string, index: number, name: keyof IProductData, required: boolean) => (
                           <StringField name={name} label={index === 0 ? "String Input" : ""} index={index}
                                        required={required} value={value} key={index}/>)}/>

            <JSONField name="numberField" required={true}
                       renderField={(value: number, index: number, name: keyof IProductData, required: boolean) => (
                           <NumberField name={name} label={index === 0 ? "Number Input" : ""} index={index}
                                        required={required} value={value} key={index}/>)}/>

            <StringField name="firstName" label="First Name" required={true} min={2} max={5}/>
            <NumberField name="age" label="Your Age" required={false} min={2} max={5}/>
            <SelectField label="Select Input :" name="select" required={true} options={selectFieldOptions}/>
            <RadioField label="Gender" name="gender" required={true} options={radioFieldOptions}/>
            <CheckField label="country" name="country" required={true} options={checkFieldOptions}/>
        </Form>
    )
}