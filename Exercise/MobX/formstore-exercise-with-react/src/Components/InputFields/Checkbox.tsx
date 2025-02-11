import { Col, FormGroup, Input, Label, Row} from "reactstrap";
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
                               onChange={() => handleCheckboxSelection(option.value)}
                               checked={Array.isArray(selectedValues) ? selectedValues.includes(option.value) : false}/>
                    </Col>
                    <Col><Label check>{option.label}</Label></Col>
                </Row>
            ))}
        </FormGroup>
    );
};

export default observer(CheckBox);
