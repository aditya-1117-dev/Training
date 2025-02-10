import {ChangeEvent} from 'react';
import {observer} from 'mobx-react-lite';
import {Input as ReactStrapInput} from 'reactstrap';
import {IStoreData} from "../../App.tsx";

export interface IStringInput {
    name: keyof IStoreData;
    value?:  string;
    required: boolean;
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    min? : number;
    max? : number
}

function StringInput({ name, value, onChange, disabled, required, min, max}: IStringInput) {
    return (
        <ReactStrapInput
            type="text"
            name={name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {onChange ? onChange(e) : e} }
            disabled={disabled}
            required={required}
            minLength={min} maxLength={max}
        />
    );
}

export default observer(StringInput);