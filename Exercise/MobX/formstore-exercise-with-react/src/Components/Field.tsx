import {ChangeEvent, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Col, FormGroup, Label} from 'reactstrap';
import {FormStoreContext, IProductData} from '../Context/FormContext';
import {FormStore} from '../Stores/formStore';

export interface IField {
    name: keyof IProductData;
    label?: string;
    store?: FormStore<IProductData>;
    required?: boolean;
    inputFieldComponent?: any;
    onChange?: Function;
    index?: number;
}

function Field({name, label, store, required, inputFieldComponent, onChange, index}: IField) {
    const formStore: FormStore<IProductData> = useContext(FormStoreContext) || store;
    if (required) typeof index === "number" ? formStore.setRequired(name, required, index) : formStore.setRequired(name, required);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        typeof index === "number" ? formStore.setValue(name, e.target.value, index) : formStore.setValue(name, e.target.value)
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
                {inputFieldComponent(inputProps, handleChange)}
                {((typeof index === "number"
                        && Array.isArray(formStore.errors[name]) && formStore.errors[name][index] !== null)
                        ? formStore.errors[name][index]
                        : formStore.errors[name])
                    &&
                    <p className={'text-danger'}>
                        {((typeof index === "number" && Array.isArray(formStore.errors[name]))
                            ? formStore.errors[name][index]
                            : formStore.errors[name])}
                    </p>
                }
            </Col>
        </FormGroup>
    );
}

export default observer(Field);