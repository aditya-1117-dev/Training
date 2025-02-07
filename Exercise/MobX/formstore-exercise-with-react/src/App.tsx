import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "./Stores/formStore.tsx";
import Form from "./Components/Form.tsx";
import {CheckField, NumberField, RadioField, SelectField, StringField} from "./Components/InputFields.tsx";

export interface IFormStore {
    firstName: string,
    name: string,
    age: number,
    country: string[],
    select: "abc" | "bcd" | "efg",
    gender: "Male" | "Female",
}

function App() {
    const obj: IFormStore = {
        firstName: "A",
        name: "Adi",
        age: 10,
        select: "efg",
        gender: "Male",
        country: ["IND"]
    }
    const formStore = new FormStore<IFormStore>(obj);
    formStore.setOnSubmitCallBack(() => console.log("on submit call"));
    return (
        <>
            <h1>MobX Exercise</h1>
            <Form showResetButton={true} showSaveButton={true} formStore={formStore}>

                <StringField name="firstName" label="First Name" required={true}/>

                <NumberField name="age" label="Your Age" required={false}/>

                <SelectField label="Select Input :" name="select" required={true}
                             options={[{value: 'null', label: 'Select the Value'},{value: 'abc', label: 'abc'}, {value: 'bcd', label: 'bcd'}, {value: 'efg', label: 'efg'}]}/>

                <RadioField label="Gender" name="gender" required={true}
                             options={[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'} ]}/>

                <CheckField label="country" name="country" required={true}
                             options={[{value: 'IND', label: 'IND'}, {value: 'UK', label: 'UK'} ]}/>

            </Form>
        </>
    )
}

export default App
