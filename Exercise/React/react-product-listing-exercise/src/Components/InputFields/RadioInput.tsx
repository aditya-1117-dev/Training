import {FormGroup, Input, Label} from "reactstrap";
import {observer} from "mobx-react-lite";
import {FormStore} from "../../stores/formStore.tsx";

export interface IRadioInput<T> {
    name: keyof T;
    disabled?: boolean;
    options?: { value: string, label: string }[];
    store?: FormStore<T>;
}

function RadioInput<T>({name, options, disabled, store}: IRadioInput<T>) {
    return (
        <FormGroup>
            {options?.map((option) => (
                <FormGroup check key={option.value} disabled={disabled}>
                    <Input type="radio" checked={store?.getValue(name) === option.value}
                           onChange={() => store?.setValue(name, option.value as T[keyof T] )} disabled={disabled}/>
                    <Label check>{option.label}</Label>
                </FormGroup>
            ))}
        </FormGroup>
    );
};

export default observer(RadioInput);