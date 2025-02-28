import {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Col, FormGroup, Label} from 'reactstrap';
import {FormStore} from "../stores/formStore.tsx";
import {formStoreContext} from "../context/formContext.tsx";

export interface IField<T> {
    name: keyof T;
    label?: string;
    store?: FormStore<T>;
    required?: boolean;
    inputFieldComponent?: any;
    callBack?: Function;
    index?: number;
    min?: number;
    max?: number;
}

function Field<T>({name, label, store, required, inputFieldComponent, callBack, index, min, max}: IField<T>) {
    const formStore: FormStore<T> = useContext(formStoreContext) || store;
    if (required){
        typeof index === "number"
            ? formStore.setRequired(name, required, index)
            : formStore.setRequired(name, required);
    }
    const handleChange = (value : any) => {
        typeof index === "number"
            ? formStore.setValue(name, value, index)
            : formStore.setValue(name,value)

        const val = typeof index === "number"
            ? formStore.getValue(name, index)
            : formStore.getValue(name)

        if (typeof val === 'string') {
            if (min && (val.length < min)) {
                formStore?.setError(name, `Minimum length should be ${min}`);
            }
            if (max && val.length > max) {
                formStore?.setError(name, `Maximum length should be ${max}`);
            }
        }
        else if (typeof val === 'number') {
            if (max && val > max) {
                formStore.setError(name, `Maximum limit is ${max}`);
            } else if (min && val < min) {
                formStore.setError(name, `Minimum limit is ${min}`);
            }
        }

        if (callBack) {
            callBack();
        }
    };
    const inputProps = {name, required};
    return (
        <FormGroup row>
            <Label for={name as string} sm={4}>
                {!index &&
                    <>
                        {label}
                        {required && <span style={{color: "red"}}>*</span>}
                    </>}
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