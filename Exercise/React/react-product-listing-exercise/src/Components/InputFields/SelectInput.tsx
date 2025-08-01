import {observer} from "mobx-react-lite";
import {Input} from "reactstrap";

export interface ISelectInput {
    name: string;
    value?: number | string;
    required: boolean;
    disabled?: boolean;
    onChange?: (value : any) => void;
    options? : {value: string, label: string}[];
}

function SelectInput({name, value, onChange, disabled = false, required = false, options}: ISelectInput ) {
    return (
        <Input type="select" name={name as string} value={value} onChange={(e) => onChange ? onChange(e.target.value) : e} disabled={disabled}
               required={required} >
            {options?.map((option: any) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Input>
    );
};

export default observer(SelectInput);
