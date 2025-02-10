import {Button, ButtonGroup} from "reactstrap";
import {observer} from "mobx-react-lite";
import {IStoreData} from "../../App.tsx";
import {FormStore} from "../../Stores/formStore.tsx";

export interface ICheckbox {
    name: keyof IStoreData;
    disabled?: boolean;
    options?: { value: string, label: string }[];
    store?: FormStore<IStoreData>;
    index? : number
}

const CheckBox = ({name, options, disabled, store, index}: ICheckbox) => {
    const stateValue = typeof index=== "number"? store?.getValue(name, index) : store?.getValue(name);
    return (
        <ButtonGroup>
            {options?.map((option: any) => (
                <Button key={option.value} color="primary" outline onClick={() =>typeof index=== "number"?  store?.pushValue(name, option.value, index) : store?.pushValue(name, option.value) }
                        active={Array.isArray(stateValue) ? stateValue.includes(option.value) : false}
                        disabled={disabled}>
                    {option.label}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default observer(CheckBox);
