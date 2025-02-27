import {observer} from "mobx-react-lite";
import { Col, FormGroup, Input, Label, Row} from "reactstrap";
import {FormStore} from "../../stores/formStore.tsx";

export interface ICheckbox {
    name: string;
    disabled?: boolean;
    options?: { value: string, label: string }[];
    store?: FormStore<any>;
    onChange? : any;
    value? : any
}

function CheckboxInput({name, options, disabled, store, onChange, value}: ICheckbox) {
    const selectedValues = value;
    function handleCheckboxSelection(value: string) {
        if (Array.isArray(selectedValues)) {
            let array = [...selectedValues];
            if (selectedValues.includes(value)) {
                array = selectedValues.filter((selectedValue) => selectedValue !== value);
            } else {
                array.push(value);
            }
            store?.setValue(name, array);
        }
    }
    return (
        <FormGroup>
            {options?.map((option) => (
                <Row key={option.value} className="align-items-center">
                    <Col xs="auto">
                        <Input type="checkbox" disabled={disabled}
                               onChange={() => store? handleCheckboxSelection(option.value) : onChange()}
                               checked={store? (Array.isArray(selectedValues) ? selectedValues.includes(option.value) : false) : Boolean(value) }/>
                    </Col>
                    <Col><Label check>{option.label}</Label></Col>
                </Row>
            ))}
        </FormGroup>
    );
}

export default observer(CheckboxInput);
