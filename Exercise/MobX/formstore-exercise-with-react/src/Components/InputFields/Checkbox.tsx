import {Button, ButtonGroup} from "reactstrap";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {FormStoreContext} from "../../Context/FormContext.tsx";
// import {IFormStore} from "../../App.tsx";

// interface ICheckboxInput {
//     name: keyof IFormStore;
//     disabled: boolean;
//     options? : {value: string, label: string}[]
// }

const CheckBox = ({name, options, disabled } : any) => {
    const store = useContext( FormStoreContext);
    return (
        <ButtonGroup>
            {options?.map((option : any) => (
                <Button key={option.value} color="primary" outline onClick={() => store.pushValue(name, option.value)} active={store.getValue(name).includes(option.value)} disabled={disabled}>
                    {option.label}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default observer(CheckBox);
