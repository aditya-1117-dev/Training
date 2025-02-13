import {ChangeEvent, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Col, FormGroup, Label} from 'reactstrap';
import {formStoreContext} from '../Context/formContext.tsx';
import {FormStore} from '../Stores/formStore';
import {IProductData} from "./ProductForm.tsx";

export interface IField {
    name: keyof IProductData;
    label?: string;
    store?: FormStore<IProductData>;
    required?: boolean;
    inputFieldComponent?: any;
    callBack?: Function;
    index?: number;
}

function Field({name, label, store, required, inputFieldComponent, callBack, index}: IField) {
    const formStore: FormStore<IProductData> = useContext(formStoreContext) || store;
    if (required){
        typeof index === "number"
            ? formStore.setRequired(name, required, index)
            : formStore.setRequired(name, required);
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        typeof index === "number"
            ? formStore.setValue(name, e.target.value, index)
            : formStore.setValue(name, e.target.value)
        if (callBack) {
            callBack();
        }
    };
    const inputProps = {name, required};
    return (
        <FormGroup row>
            <Label for={name} sm={4}>
                {label}
                {required && !index
                    && <span style={{color: "red"}}>*</span>}
            </Label>
            <Col sm={8}>
                {inputFieldComponent(inputProps, handleChange)}
                {<p className={'text-danger'}>
                        {typeof index === "number"
                            ? formStore.getErrorMessage(name, index)
                            : formStore.getErrorMessage(name)}
                </p>}
            </Col>
        </FormGroup>
    );
}

export default observer(Field);