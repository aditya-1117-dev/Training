import {FormGroup, Input, Label} from "reactstrap";
import {observer} from "mobx-react-lite";

export interface IRadioInput {
    name: string;
    disabled?: boolean;
    options?: { value: string, label: string }[];
    value?: string;
    onChange: (value : any) => void;
}

function RadioInput({name, options, disabled, value, onChange}: IRadioInput) {
    return (
        <FormGroup name={name}>
            {options?.map((option) => (
                <FormGroup check key={option.value} disabled={disabled}>
                    <Input type="radio" checked={value === option.value}
                           onChange={() => onChange(option.value)} disabled={disabled}/>
                    <Label check>{option.label}</Label>
                </FormGroup>
            ))}
        </FormGroup>
    );
}

export default observer(RadioInput);