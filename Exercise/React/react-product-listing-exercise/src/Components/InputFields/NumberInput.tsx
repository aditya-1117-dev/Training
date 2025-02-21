import {ChangeEvent} from 'react';
import {observer} from 'mobx-react-lite';
import {Input as ReactStrapInput} from 'reactstrap';
import {IProductData} from "../../Pages/AddNewProduct/ProductForm.tsx";
import {FormStore} from "../../stores/formStore.tsx";

export interface INumberInput {
    name: keyof IProductData;
    value?: number;
    required: boolean;
    disabled?: boolean;
    onChange?: (value : any) => void;
    min? : number;
    max? : number;
    store? : FormStore<IProductData>;
}

function NumberInput({name, value, onChange, disabled, required, min, max, store}: INumberInput) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
        if ( e.target.value.trim().length && store) {
            if (max && Number(e.target.value) > max) {
                store.setError(name, `Maximum limit is ${max}`);
            } else if (min && Number(e.target.value) < min) {
                store.setError(name, `Minimum limit is ${min}`);
            }
        }
    };
    return (
        <ReactStrapInput
            type="number"
            name={name as string}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            min={min} max={max}
        />
    );
}

export default observer(NumberInput);