import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {ChangeEvent} from "react";
import Field from "./Components/Field.tsx";
import {FormStore} from "./Stores/formStore.tsx";
import Input from "./Components/ReactInput.tsx";
import Form from "./Components/Form.tsx";

export interface IFormStore {
    name: string,
    age: number
}

function App() {
    const obj: IFormStore = {
        name: "Adi",
        age: 10
    }
    const formStore = new FormStore<IFormStore>(obj);
    formStore.setOnSubmitCallBack(() => console.log("on submit call"));

    return (
        <>
            <h1>MobX Exercise</h1>
            <Form showResetButton={true} showSaveButton={true} formStore={formStore}>

                <Field label="Name" store={formStore} name="name" required={true}
                       onChange={() => console.log("Callback Name")}
                       component={(inputProps: {
                           name: keyof IFormStore,
                           required: boolean
                       }, handleChange: (e: ChangeEvent<HTMLInputElement>, key: keyof IFormStore) => void) => (
                           <Input {...inputProps} type="text" value={formStore.getValue("name")} onChange={handleChange}
                                  disabled={formStore.isSubmitted}/>
                       )}
                />
                <Field label="Age" store={formStore} name="age" required={false}
                       onChange={() => console.log("Callback Age")}
                       component={(inputProps: {
                           name: keyof IFormStore, required: boolean
                       }, handleChange: (e: ChangeEvent<HTMLInputElement>, key: keyof IFormStore) => void) => (
                           <Input {...inputProps} type="number" value={formStore.getValue("age")}
                                  onChange={handleChange} disabled={formStore.isSubmitted}/>
                       )}
                />
            </Form>
        </>
    )
}

export default App
