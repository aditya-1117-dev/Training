import {observer} from "mobx-react-lite";
import {Input} from "reactstrap";
import {ChangeEvent} from "react";

interface IReactInput {
    type: 'text' | 'number',
    name: string,
    value : number | string
    required: boolean,
    disabled : boolean,
    onChange : (e: ChangeEvent<HTMLInputElement>, key : string) => void,
}

function ReactInput({ type, name, value, onChange, disabled, required } : IReactInput) {
    return (
        <Input
            type={type}
            name={name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, name)}
            disabled={disabled}
            required={required} />
    )
}
export default observer(ReactInput);