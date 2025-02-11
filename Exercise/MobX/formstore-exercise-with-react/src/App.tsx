import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "./Components/Form.tsx";
import {CheckField, JSONField, NumberField, RadioField, SelectField, StringField} from "./Components/InputFields.tsx";
import {observer} from "mobx-react-lite";
import { ListTableStoreContext } from './Context/ListTableContext.tsx';
import ListTable from "./Components/ListTable.tsx";
import {formStore, IStoreData} from "./Context/FormContext.tsx";
import ListTableStore from "./Stores/ListTableStore.tsx";
import {IFetchedProducts} from "./types/tableType.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const baseUrl: string = `https://dummyjson.com/products`;
export const listTableStore : ListTableStore<IFetchedProducts> = new ListTableStore<IFetchedProducts>(baseUrl);

function App() {
    // const columns = ["title","description", "price","thumbnail"];
    const columns = {title: "Product Title", description: "Description", price: "Price", thumbnail: "Image"};

    return (
        <BrowserRouter>
            <Routes >
                <Route path="/" element={(
                    <Form showResetButton={true} showSaveButton={true} formStore={formStore}>
                        <JSONField name="jsonStringField" required={true}
                                   renderField={(value: string, index: number, name: keyof IStoreData, required: boolean) => (
                                       <StringField name={name} label={index === 0 ? "String Input" : ""} index={index}
                                                    required={required} value={value} key={index}/>)}/>

                        <JSONField name="jsonNumberField" required={true}
                                   renderField={(value: number, index: number, name: keyof IStoreData, required: boolean) => (
                                       <NumberField name={name} label={index === 0 ? "Number Input" : ""} index={index}
                                                    required={required} value={value} key={index}/>)}/>

                        <StringField name="firstName" label="First Name" required={true} min={2} max={5}/>
                        <NumberField name="age" label="Your Age" required={false} min={2} max={5}/>
                        <SelectField label="Select Input :" name="select" required={true}
                                     options={[{value: 'null', label: 'Select the Value'}, {
                                         value: 'abc',
                                         label: 'abc'
                                     }, {value: 'bcd', label: 'bcd'}, {value: 'efg', label: 'efg'}]}/>
                        <RadioField label="Gender" name="gender" required={true}
                                    options={[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'}]}/>
                        <CheckField label="country" name="country" required={true}
                                    options={[{value: 'IND', label: 'IND'}, {value: 'UK', label: 'UK'}]}/>
                    </Form>
                )} />
                <Route path={"/product-table"} element={(
                    <ListTableStoreContext.Provider value={listTableStore}>
                        <ListTable columns={columns} Key={"products"}/>
                    </ListTableStoreContext.Provider>
                )} />
            </Routes>
        </BrowserRouter>
    )
}

export default observer(App)
