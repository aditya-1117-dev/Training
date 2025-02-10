import {observer} from "mobx-react-lite";
import {Input} from "reactstrap";
import {IStoreData} from "../../App.tsx";
import {ChangeEvent} from "react";

export interface ISelectInput {
    name: keyof IStoreData;
    value?: number | string;
    required: boolean;
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    options? : {value: string, label: string}[]
}

const SelectInput = ({name, value, onChange, disabled = false, required = false, options}: ISelectInput ) => {
    return (
        <Input type="select" name={name} value={value} onChange={(e) => onChange ? onChange(e) : e} disabled={disabled}
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
