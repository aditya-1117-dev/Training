import {observer} from "mobx-react-lite";
import withField from "../HOC/withField.tsx";
import {Button, Col, Row} from "reactstrap";
import AddField from "./AddField.tsx";
import {IProductData} from "./ProductForm.tsx";

interface IJSONField {
    name: keyof IProductData,
    RenderField: (props: any) => JSX.Element,
    required?: boolean,
    label?: string,
    jsonFields : any,
    isSubmitted? : boolean,
    handleAddNewInput: any,
    removeInputField : any
}

export const JSONField = observer(({RenderField, name, required = false, label, jsonFields, isSubmitted, handleAddNewInput, removeInputField }: IJSONField): JSX.Element => {
    const RenderComponent = withField((props: any) => {
        const isFormSubmitted = props.store.isSubmitted;
        if (!(Array.isArray(jsonFields) && jsonFields.length > 0)) return <></>;
        return (
            <Row>
                <Col md={8}>
                    <RenderField {...props} />
                </Col>
                <Col md={4}>{props.index > 0 &&
                    <Button onClick={() => removeInputField(props.index, name)} color={"danger"}
                            disabled={isFormSubmitted}> Delete </Button>}</Col>
            </Row>
        )
    } );
    return (
        <>
            {jsonFields.map((item: any, index : number) => {
                return (
                    <RenderComponent key={index} label={label}
                                     name={name} required={required}
                                     index={index} />
                )
            })}
            <AddField handleAddNewInput={()=> handleAddNewInput(name)} disabled={isSubmitted}/>
        </>
    );
});