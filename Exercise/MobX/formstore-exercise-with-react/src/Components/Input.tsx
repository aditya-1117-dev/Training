import {ChangeEvent} from 'react';
import {observer} from 'mobx-react-lite';
import {Input as ReactStrapInput} from 'reactstrap';
import {IFormStore} from "../App.tsx";

interface IInput {
    type: any;
    name: keyof IFormStore;
    value: number | string;
    required: boolean;
    disabled: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>, key: keyof IFormStore) => void;
    options? :any
}

function Input({type, name, value, onChange, disabled, required, options}: IInput) {
    return (
        <ReactStrapInput
            type={type}
            name={name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, name)}
            disabled={disabled}
            required={required}
        >
            {options &&
                options.map((option : any) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
            }
        </ReactStrapInput>
    );
}

export default observer(Input);