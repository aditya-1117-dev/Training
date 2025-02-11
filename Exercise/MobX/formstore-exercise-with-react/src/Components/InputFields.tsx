import withField, {IWithFieldProps} from "../HOC/withField.tsx";
import RadioInput, {IRadioInput} from "./InputFields/RadioInput.tsx";
import Checkbox, {ICheckbox} from "./InputFields/Checkbox.tsx";
import SelectInput, {ISelectInput} from "./InputFields/SelectInput.tsx";
import NumberInput, {INumberInput} from "./InputFields/NumberInput.tsx";
import StringInput, {IStringInput} from "./InputFields/StringInput.tsx";
import {Fragment, useContext} from "react";
import AddField from "./AddField.tsx";
import {FormStoreContext, IStoreData} from "../Context/FormContext.tsx";
import {observer} from "mobx-react-lite";
import {Button} from "reactstrap";

export const StringField = withField<IStringInput & IWithFieldProps> ( (props:IStringInput) =>(<StringInput {...props} />));
export const NumberField = withField<IWithFieldProps & INumberInput>( (props:INumberInput) =>(<NumberInput {...props} />));
export const SelectField = withField<IWithFieldProps & ISelectInput>( (props:ISelectInput) =><SelectInput {...props} />);
export const CheckField = withField<IWithFieldProps & ICheckbox>( (props:ICheckbox) =><Checkbox {...props} />);
export const RadioField = withField<IWithFieldProps & IRadioInput>( (props:IRadioInput) =><RadioInput {...props} />);

export const JSONField = observer( ({renderField, name, required = false } : { name : keyof IStoreData, renderField : Function, required? : boolean } ) : JSX.Element =>{
    const store = useContext(FormStoreContext);
    const jsonInput = store.getValue(name);
    if (Array.isArray(jsonInput) && jsonInput.length > 0) {
        function handleAddNewInput() {
            if (Array.isArray(jsonInput)){
                store.pushValue(name, typeof jsonInput[0]==="number"? 0 : ``, jsonInput?.length);
            }
        }
        return (
            <>
                {jsonInput.map((item, index) => {
                    if ( index > 0 ) required = false;
                    function removeInputBox() {
                        store.removeItemFromArray(name, index);
                    }
                    return (
                        <Fragment key={index}>
                            {index > 0 && <Button onClick={removeInputBox} color={"danger"}> Delete </Button>}
                            {renderField(item, index, name, required)}
                        </Fragment>
                    )
                })}
                <AddField handleAddNewInput={handleAddNewInput} disabled={store.isSubmitted} />
            </>
        );
    }
    return <></>;
});