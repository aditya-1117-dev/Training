import {Button, ButtonGroup} from "reactstrap";
import {observer} from "mobx-react-lite";
import {IStoreData} from "../../App.tsx";
import {FormStore} from "../../Stores/formStore.tsx";

export interface IRadioInput {
    name: keyof IStoreData;
    disabled?: boolean;
    options?: { value: string, label: string }[];
    store?: FormStore<IStoreData>;
    index?: number
}

const RadioInput = ({name, options, disabled, store, index}: IRadioInput) => {
    return (
        <ButtonGroup>
            {options?.map((option: any) => (
                <Button key={option.value} color="primary" outline onClick={() => typeof index === "number" ? store?.setValue(name, option.value, index) : store?.setValue(name, option.value)} active={(typeof index === "number" ? store?.getValue(name, index) : store?.getValue(name)) === (option.value)} disabled={disabled}>
                    {option.label}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default observer(RadioInput);