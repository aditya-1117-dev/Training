import {ChangeEvent} from 'react';
import {observer} from 'mobx-react-lite';
import {Input as ReactStrapInput} from 'reactstrap';

export interface IStringInput {
    name: string;
    value?:  string;
    required: boolean;
    disabled?: boolean;
    onChange?: (value : any) => void;
}

function StringInput({ name, value, onChange, disabled, required}: IStringInput ) {
    const handleChange = ( e : ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
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
        />
    );
}

export default observer(StringInput);