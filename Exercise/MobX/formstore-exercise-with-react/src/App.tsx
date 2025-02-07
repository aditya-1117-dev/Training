import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "./Stores/formStore.tsx";
import Form from "./Components/Form.tsx";
import {CheckField, NumberField, RadioField, SelectField, StringField} from "./Components/InputFields.tsx";
import {FormGroup, Label} from "reactstrap";

export interface IFormStore {
    firstName: string,
    name: string,
    age: number,
    country: "IND" | "UK" | "USA" | "CA",
    select: "abc" | "bcd" | "efg",
    gender: "Male" | "Female",
}

function App() {

    const obj: IFormStore = {
        firstName: "A",
        name: "Adi",
        age: 10,
        select: "abc",
        gender: "Male",
        country: "IND"
    }
    const formStore = new FormStore<IFormStore>(obj);
    formStore.setOnSubmitCallBack(() => console.log("on submit call"));

    return (
        <>
            <h1>MobX Exercise</h1>
            <Form showResetButton={true} showSaveButton={true} formStore={formStore}>
                <StringField name="firstName" label="First Name" required={true}/>
                <NumberField name="age" label="Your Age" required={false}/>
                <SelectField label="Country" name="country" required={true}
                             options={[{value: 'USA', label: 'United States'}, {value: 'IND', label: 'India'}, {value: 'CA', label: 'Canada'}, {value: 'UK', label: 'United Kingdom'}]}/>

                <FormGroup>
                    <Label>Select your Gender :</Label>
                    <Label><RadioField name="select" label="Male" required={false}/></Label>
                    <Label><RadioField label="Female" name="select" required={false}/></Label>
                </FormGroup>

                <FormGroup>
                    <Label>Select your Gender :</Label>
                    <Label><CheckField name="gender" label="Male" required={false}/></Label>
                    <Label><CheckField label="Female" name="gender" required={false}/></Label>
                </FormGroup>

            </Form>
        </>
    )
}

export default App
