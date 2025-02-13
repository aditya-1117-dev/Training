import withField, {IWithFieldProps} from "../HOC/withField.tsx";
import RadioInput, {IRadioInput} from "./InputFields/RadioInput.tsx";
import Checkbox, {ICheckbox} from "./InputFields/Checkbox.tsx";
import SelectInput, {ISelectInput} from "./InputFields/SelectInput.tsx";
import NumberInput, {INumberInput} from "./InputFields/NumberInput.tsx";
import StringInput, {IStringInput} from "./InputFields/StringInput.tsx";
import {Fragment, useContext} from "react";
import AddField from "./AddField.tsx";
import {formStoreContext} from "../Context/formContext.tsx";
import {observer} from "mobx-react-lite";
import {Button, Col, Row} from "reactstrap";
import {IProductData} from "./ProductForm.tsx";

interface IJSONField{
    name: keyof IProductData,
    renderField: Function,
    required?: boolean
}

export const StringField = withField<IStringInput & IWithFieldProps>((props: IStringInput) => (
    <StringInput {...props} />));
export const NumberField = withField<IWithFieldProps & INumberInput>((props: INumberInput) => (
    <NumberInput {...props} />));
export const SelectField = withField<IWithFieldProps & ISelectInput>((props: ISelectInput) =>
    <SelectInput {...props} />);
export const CheckField = withField<IWithFieldProps & ICheckbox>((props: ICheckbox) => <Checkbox {...props} />);
export const RadioField = withField<IWithFieldProps & IRadioInput>((props: IRadioInput) => <RadioInput {...props} />);

export const JSONField = observer(({renderField, name, required = false}: IJSONField): JSX.Element => {
    const store = useContext(formStoreContext);
    const jsonFields = store.getValue(name);
    const isFormSubmitted = store.isSubmitted;
    if (!(Array.isArray(jsonFields) && jsonFields.length > 0)) return <></>;

    function handleAddNewInput() {
        if (Array.isArray(jsonFields)) {
            store.pushValue(name, ``);
        }
    }

    function removeInputField(index: number) {
        store.removeItemFromArray(name, index);
    }

    return (
        <>
            {jsonFields.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <Row>
                            <Col md={8}> {renderField(item, index, name, required)} </Col>
                            <Col md={4}>{index > 0 &&
                                <Button onClick={() => removeInputField(index)} color={"danger"} disabled={isFormSubmitted} > Delete </Button>}</Col>
                        </Row>
                    </Fragment>
                )
            })}
            <AddField handleAddNewInput={handleAddNewInput} disabled={store.isSubmitted}/>
        </>
    );
});