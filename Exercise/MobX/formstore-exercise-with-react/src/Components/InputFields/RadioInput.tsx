import {Button, ButtonGroup} from "reactstrap";
import {observer} from "mobx-react-lite";
import {FormStore} from "../../Stores/formStore.tsx";
import {IStoreData} from "../../Context/FormContext.tsx";

export interface IRadioInput {
    name: keyof IStoreData;
    disabled?: boolean;
    options?: { value: string, label: string }[];
    store?: FormStore<IStoreData>;
}

const RadioInput = ({name, options, disabled, store}: IRadioInput) => {
    return (
        <ButtonGroup>
            {options?.map((option: any) => (
                <Button key={option.value} color="primary" outline onClick={() => store?.setValue(name, option.value)}
                        active={(store?.getValue(name)) === (option.value)} disabled={disabled}>
                    {option.label}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default observer(RadioInput);