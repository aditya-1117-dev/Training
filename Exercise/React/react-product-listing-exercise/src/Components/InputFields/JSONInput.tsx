import {observer} from "mobx-react-lite";
import {Button, Col, Row} from "reactstrap";
import AddField from "../AddField.tsx";

export interface IJSONField<T> {
    name: keyof T,
    RenderField: (props: any) => JSX.Element,
    required?: boolean,
    label?: string,
    store?: any,
    onChange?: any,
    value?: any
}

function JSONInput<T>(props: IJSONField<T>) {
    const store = props?.store;
    const isFormSubmitted = store.isSubmitted;
    const jsonFields = store.getValue(props.name);
    if (!(Array.isArray(jsonFields) && jsonFields.length > 0)) return <></>;

    const {onChange, value, ...renderFieldProps} = props;

    function handleAddNewInput(name: keyof T) {
        store.pushValue(name, ``);
    }
    function removeInputField(index: number) {
        store.removeItemFromArray(props.name, index);
    }
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
                            <Button onClick={() => removeInputField(index)} color={"danger"}
                                    disabled={isFormSubmitted}> Delete </Button>}</Col>
                    </Row>
                )
            })}
            <AddField handleAddNewInput={() => handleAddNewInput(props.name)} disabled={isFormSubmitted}/>
        </>
    )
};
export default observer(JSONInput)