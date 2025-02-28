import {observer} from "mobx-react-lite";
import { Col, FormGroup, Input, Label, Row} from "reactstrap";

export interface ICheckbox {
    name: string;
    disabled?: boolean;
    options?: { value: string, label: string }[];
    onChange? : any;
    value? : any
}

function CheckboxInput({name, options, disabled, onChange, value}: ICheckbox) {
    const selectedValues = value;
    function handleCheckboxSelection(value: string) {
        if (Array.isArray(selectedValues)) {
            let array = [...selectedValues];
            if (selectedValues.includes(value)) {
                array = selectedValues.filter((selectedValue) => selectedValue !== value);
            } else {
                array.push(value);
            }
            onChange(array);
        }
    }
    return (
        <FormGroup name={name}>
            {options?.map((option) => (
                <Row key={option.value} className="align-items-center">
                    <Col xs="auto">
                        <Input type="checkbox" disabled={disabled}
                               onChange={() => handleCheckboxSelection(option.value) }
                               checked={(Array.isArray(selectedValues) ? selectedValues.includes(option.value) : Boolean(value))  }/>
                    </Col>
                    <Col><Label check>{option.label}</Label></Col>
                </Row>
            ))}
        </FormGroup>
    );
}

export default observer(CheckboxInput);
