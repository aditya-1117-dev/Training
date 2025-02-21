import {ChangeEvent} from 'react';
import {observer} from 'mobx-react-lite';
import {Input as ReactStrapInput} from 'reactstrap';
import {IProductData} from "../ProductForm.tsx";
import {FormStore} from "../../Stores/formStore.tsx";

export interface IStringInput {
    name: keyof IProductData;
    value?:  string;
    required: boolean;
    disabled?: boolean;
    onChange?: (value : any) => void;
    min? : number;
    max? : number;
    store? : FormStore<IProductData>
}

function StringInput({ name, value, onChange, disabled, required, min, max, store}: IStringInput) {
    const handleChange = ( e : ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
        if (min && e.target.value.length < min) {
            store?.setError(name, `Minimum length should be ${min}`);
        }
        if (max && e.target.value.length > max) {
            store?.setError(name, `Maximum length should be ${max}`);
        }
    }
    return (
        <ReactStrapInput
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            // minLength={min} maxLength={max}
        />
    );
}

export default observer(StringInput);