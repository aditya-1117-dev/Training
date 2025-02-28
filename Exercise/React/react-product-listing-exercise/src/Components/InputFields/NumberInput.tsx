import {ChangeEvent} from 'react';
import {observer} from 'mobx-react-lite';
import {Input as ReactStrapInput} from 'reactstrap';

export interface INumberInput {
    name: string ;
    value?: number;
    required: boolean;
    disabled?: boolean;
    onChange: (value : any) => void;
}

function NumberInput({name, value, onChange, disabled, required}: INumberInput) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
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
        />
    );
}

export default observer(NumberInput);