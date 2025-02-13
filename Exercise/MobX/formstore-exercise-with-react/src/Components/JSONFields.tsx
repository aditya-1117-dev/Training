import {observer} from "mobx-react-lite";
import {Fragment, useContext} from "react";
import {formStoreContext} from "../Context/formContext.tsx";
import withField from "../HOC/withField.tsx";
import {Button, Col, Row} from "reactstrap";
import AddField from "./AddField.tsx";
import {IProductData} from "./ProductForm.tsx";

interface IJSONField{
    name: keyof IProductData,
    RenderField: (props : any)=>JSX.Element,
    required?: boolean,
    label? : string
}

export const JSONField = observer(({RenderField, name, required = false, label}: IJSONField): JSX.Element => {
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

    const RenderComponent = withField( (props: any) => <RenderField {...props} /> );

    return (
        <>
            {jsonFields.map( (item, index) => {
                return (
                    <Fragment key={index}>
                        <Row>
                            <Col md={8}>
                                <RenderComponent label={label}
                                                 name={name} required={required}
                                                 index={index}/>
                            </Col>
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