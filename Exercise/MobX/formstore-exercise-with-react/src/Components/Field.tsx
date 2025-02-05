import {FormStore} from "../Stores/formStore.tsx";
import {ChangeEvent, useContext} from "react";
import {observer} from "mobx-react-lite";
import {Col, FormGroup, Label} from "reactstrap";
import ReactInput from "./ReactInput.tsx";
import {FormStoreContext} from "../Context/FormContext.tsx";

interface IField {
    type : 'text'|'number',
    name : string,
    label : string,
    store : FormStore,
    required : boolean,
}

function Field({ type, name, label, store, required} : IField){
    const contextStore = useContext(FormStoreContext);
    const formStore = store || contextStore;

    const value = formStore.getValue(name);
    const disabled = formStore.isSubmitted ;

    const handleChange = (e: ChangeEvent<HTMLInputElement>, key : string) => {
        formStore.errors = {}
        formStore.setValue(key, e.target.value);
    };

    return (
        <FormGroup row>
            <Label for={name} sm={4}>
                {label}{required && <span style={{color: "red"}}>*</span>}
            </Label>
            <Col sm={8}>
                <ReactInput
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    required={required}
                />
                {formStore.errors[name] && <p className={'text-danger'}>{formStore.errors[name]}</p>}
            </Col>
        </FormGroup>
    )
}

export default observer(Field);