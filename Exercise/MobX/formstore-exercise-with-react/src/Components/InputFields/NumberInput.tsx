import {ChangeEvent} from 'react';
import {observer} from 'mobx-react-lite';
import {Input as ReactStrapInput} from 'reactstrap';
import {IFormStore} from "../../App.tsx";

interface IInput {
    name: keyof IFormStore;
    value: number | string;
    required: boolean;
    disabled: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>, key: keyof IFormStore) => void;
}

function NumberInput({name, value, onChange, disabled, required}: IInput) {
    return (
        <ReactStrapInput
            type="number"
            name={name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, name)}
            disabled={disabled}
            required={required}
        />
    );
}

export default observer(NumberInput);