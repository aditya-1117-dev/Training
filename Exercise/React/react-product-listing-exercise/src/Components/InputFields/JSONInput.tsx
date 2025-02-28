import {observer} from "mobx-react-lite";
import {Button, Col, Row} from "reactstrap";
import AddField from "../AddField.tsx";

export interface IJSONInput {
    name: string,
    RenderField: (props: any) => JSX.Element,
    required?: boolean,
    label?: string,
    onChange?: any,
    value?: any,
    disabled?: boolean;
    handleAddNewInput: (name: string) => void;
    removeInputField: (index: number) => void;
}

function JSONInput(props: IJSONInput) {
    const isFormSubmitted = props.disabled;
    const jsonFields = props.value;
    if (!(Array.isArray(jsonFields) && jsonFields.length > 0)) return <></>;

    const {onChange, value, ...renderFieldProps} = props;

    function handleOnchange(val: any, index: number) {
        const array = [...value];
        array[index] = val;
        onChange(array);
    }
    return (
        <>
            {jsonFields.map((_: any, index: number) => {
                return (
                    <Row key={index}>
                        <Col md={8}>
                            <props.RenderField {...renderFieldProps} value={value[index]}
                                               onChange={(value: any) => handleOnchange(value, index)}/>
                        </Col>
                        <Col md={4}>{index > 0 &&
                            <Button onClick={() => props.removeInputField(index)} color={"danger"}
                                    disabled={isFormSubmitted}> Delete </Button>}</Col>
                    </Row>
                )
            })}
            <AddField handleAddNewInput={() => props.handleAddNewInput(props.name)} disabled={isFormSubmitted}/>
        </>
    )
}
export default observer(JSONInput)