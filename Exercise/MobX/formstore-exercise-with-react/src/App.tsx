import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormStore} from "./Stores/formStore.tsx";
import Form from "./Components/Form.tsx";
import {CheckField, JSONField, NumberField, RadioField, SelectField, StringField} from "./Components/InputFields.tsx";
import AddField from "./Components/AddField.tsx";
import {observer} from "mobx-react-lite";

export interface IFormStore {
    firstName: string,
    name: string,
    age: number,
    country: string[],
    select: "abc" | "bcd" | "efg",
    gender: "Male" | "Female",
    jsonKeys : [string[], "Male" | "Female", string, number, "first" | "second" | "third"],
    NewFieldType : string;
    NewInput : any;
    newInputRequiredValue : boolean
}

function App() {
    const obj: IFormStore = {
        firstName: "A",
        name: "Adi",
        age: 10,
        select: "efg",
        gender: "Male",
        country: ["IND"],
        jsonKeys : [["IND"],"Male","Adi", 1, "first",],
        newInputRequiredValue: false,
        NewFieldType : "",
        NewInput : ""
    }
    const formStore = new FormStore<IFormStore>(obj);
    formStore.setOnSubmitCallBack(() => console.log("on submit call"));

    const jsonField  = [{ type : "checkbox", label:"country", name:"jsonKeys", required:true, options:[{value: 'IND', label: 'IND'}, {value: 'UK', label: 'UK'} ] },
                        { type : "radio", name:"jsonKeys", label:"Gender :", required:true, options:[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'} ] },
                        { type : "string", name:"jsonKeys", label:"Last Name", required:true },
                        { type : "number", name:"jsonKeys", label:"Age", required:true },
                        { type : "select", label:"Select Input :", name:"jsonKeys", required:true, options:[{value: 'null', label: 'Select the Value'},{value: 'first', label: 'first'}, {value: 'second', label: 'second'}, {value: 'third', label: 'third'}]}];
    return (
        <>
            <h1>MobX Exercise</h1>
            <Form showResetButton={true} showSaveButton={true} formStore={formStore}>
                <JSONField props={jsonField} />
                {/*<StringField name="firstName" label="First Name" required={true} min={2} max={5} />*/}
                {/*<NumberField name="age" label="Your Age" required={false} min={2} max={5} />*/}
                {/*<SelectField label="Select Input :" name="select" required={true}*/}
                {/*             options={[{value: 'null', label: 'Select the Value'},{value: 'abc', label: 'abc'}, {value: 'bcd', label: 'bcd'}, {value: 'efg', label: 'efg'}]}/>*/}
                {/*<RadioField label="Gender" name="gender" required={true}*/}
                {/*             options={[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'} ]}/>*/}
                {/*<CheckField label="country" name="country" required={true}*/}
                {/*             options={[{value: 'IND', label: 'IND'}, {value: 'UK', label: 'UK'} ]}/>*/}
            </Form>
            {/*<AddField formStore={formStore} jsonField={jsonField} />*/}
        </>
    )
}

export default observer(App)
