import {FormGroup, Input, Label} from "reactstrap";
import {observer} from "mobx-react-lite";
import {FormStore} from "../../stores/formStore.tsx";

export interface IRadioInput {
    name: string;
    disabled?: boolean;
    options?: { value: string, label: string }[];
    store?: FormStore<any>;
}

function RadioInput({name, options, disabled, store}: IRadioInput) {
    return (
        <FormGroup>
            {options?.map((option) => (
                <FormGroup check key={option.value} disabled={disabled}>
                    <Input type="radio" checked={store?.getValue(name) === option.value}
                           onChange={() => store?.setValue(name, option.value )} disabled={disabled}/>
                    <Label check>{option.label}</Label>
                </FormGroup>
            ))}
        </FormGroup>
    );
}

export default observer(RadioInput);