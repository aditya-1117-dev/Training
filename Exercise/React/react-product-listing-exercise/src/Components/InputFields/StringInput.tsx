import {ChangeEvent} from 'react';
import {observer} from 'mobx-react-lite';
import {Input as ReactStrapInput} from 'reactstrap';
import {FormStore} from "../../stores/formStore.tsx";

export interface IStringInput<T> {
    name: keyof T;
    value?:  string;
    required: boolean;
    disabled?: boolean;
    onChange?: (value : any) => void;
    min? : number;
    max? : number;
    store? : FormStore<T>
}

function StringInput<T>({ name, value, onChange, disabled, required, min, max, store}: IStringInput<T> ) {
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
            name={name as string}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
        />
    );
}

export default observer(StringInput);