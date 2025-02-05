import Field from "./Field.tsx";
import {FormStoreContext} from "../Context/FormContext.tsx";
import {Button, Col, Form, Row} from "reactstrap";
import {observer} from "mobx-react-lite";
import {formStore} from "../Stores/formStore.tsx";

interface IReactForm{
    showSaveButton : boolean,
    showResetButton : boolean
}

function ReactForm( { showSaveButton, showResetButton} : IReactForm){
    return (
        <FormStoreContext.Provider value={formStore}>
            <Form>
                <Field type="text" label="Name" store={formStore} name="name" required={true}/>
                <Field type="text" label="Address" store={formStore} name="address" required={true}/>
                <Field type="number" label="Age" store={formStore} name="age" required={false}/>
                <Row>
                    <Col>
                        { (!formStore.isSubmitted || showSaveButton)
                            && <Button onSubmit={() => formStore.submitForm()} color="primary" > Submit </Button> }
                    </Col>
                    <Col>
                        { (formStore.isSubmitted || showResetButton)
                            && <Button onClick={() => formStore.resetForm()} color="primary" > Reset </Button>
                        }
                    </Col>
                </Row>
            </Form>
        </FormStoreContext.Provider>
    )
}

export default observer(ReactForm);