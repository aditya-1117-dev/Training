import {ChangeEvent, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Col, FormGroup, Label} from 'reactstrap';
import {FormStoreContext} from '../Context/FormContext';
import {FormStore} from '../Stores/formStore';
import {IFormStore} from "../App.tsx";

interface IField {
    name: keyof IFormStore;
    label: string;
    store: FormStore<IFormStore>;
    required: boolean;
    component: any;
    onChange?: () => void;
}

function Field({name, label, store, required, component, onChange}: IField) {
    const contextStore = useContext(FormStoreContext);
    const formStore: FormStore<IFormStore> = contextStore || store;
    if (required) formStore.setRequired(name, required);
    const handleChange = (e: ChangeEvent<HTMLInputElement>, key: keyof IFormStore) => {
        formStore.setValue(key, e.target.value);
        if (onChange) {
            onChange();
        }
    };
    const inputProps = {name, required};
    return (
        <FormGroup row>
            <Label for={name} sm={4}>
                {label}{required && <span style={{color: "red"}}>*</span>}
            </Label>
            <Col sm={8}>
                {component(inputProps, handleChange)}
                {formStore.errors[name] && <p className={'text-danger'}>{formStore.errors[name]}</p>}
            </Col>
        </FormGroup>
    );
}

export default observer(Field);