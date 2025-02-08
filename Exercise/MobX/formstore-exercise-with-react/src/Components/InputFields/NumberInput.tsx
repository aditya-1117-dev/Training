import {ChangeEvent} from 'react';
import {observer} from 'mobx-react-lite';
import {Input as ReactStrapInput} from 'reactstrap';
import {IFormStore} from "../../App.tsx";

export interface INumberInput {
    name: keyof IFormStore;
    value: number | string;
    required: boolean;
    disabled: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    min? : number;
    max? : number;
}

function NumberInput({name, value, onChange, disabled, required, min, max}: INumberInput) {
    return (
        <ReactStrapInput
            type="number"
            name={name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
            disabled={disabled}
            required={required}
            min={min} max={max}
        />
    );
}

export default observer(NumberInput);