import {Button, ButtonGroup} from "reactstrap";
import {observer} from "mobx-react-lite";
import {FormStore} from "../../Stores/formStore.tsx";
import {IStoreData} from "../../Context/FormContext.tsx";

export interface ICheckbox {
    name: keyof IStoreData;
    disabled?: boolean;
    options?: { value: string, label: string }[];
    store?: FormStore<IStoreData>;
}

const CheckBox = ({name, options, disabled, store}: ICheckbox) => {
    const selectedValues = store?.getValue(name) as string[];

    function handleCheckboxSelection(value : string) {
        if (Array.isArray(selectedValues)){
            let array = [...selectedValues];
            if (selectedValues.includes(value)){
                array = selectedValues.filter((selectedValue)=> selectedValue!== value );
            }else {
                array.push(value);
            }
            store?.setValue(name, array);
        }
    }

    return (
        <ButtonGroup>
            {options?.map((option: any) => (
                <Button key={option.value} color="primary" outline
                        onClick={()=> handleCheckboxSelection( option.value )}
                        active={Array.isArray(selectedValues) ? selectedValues.includes(option.value) : false}
                        disabled={disabled}>
                    {option.label}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default observer(CheckBox);
