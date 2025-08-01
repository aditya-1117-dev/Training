import {observer} from "mobx-react-lite";
import {Input} from "reactstrap";
import {IProductData} from "../ProductForm.tsx";

export interface ISelectInput {
    name: keyof IProductData;
    value?: number | string;
    required: boolean;
    disabled?: boolean;
    onChange?: (value : any) => void;
    options? : {value: string, label: string}[]
}

const SelectInput = ({name, value, onChange, disabled = false, required = false, options}: ISelectInput ) => {
    return (
        <Input type="select" name={name} value={value} onChange={(e) => onChange ? onChange(e.target.value) : e} disabled={disabled}
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
