import {FormStoreContext} from "../Context/FormContext.tsx";
import {Button, Col, Form, Row} from "reactstrap";
import {observer} from "mobx-react-lite";
import {ReactNode} from "react";
import {FormStore} from "../Stores/formStore.tsx";
import {IFormStore} from "../App.tsx";

interface IReactForm {
    showSaveButton: boolean,
    showResetButton: boolean,
    children: ReactNode,
    formStore: FormStore<IFormStore>
}

function ReactForm({showSaveButton, showResetButton, children, formStore}: IReactForm) {
    return (
        <FormStoreContext.Provider value={formStore}>
            <Form>
                {children}
                <Row>
                    <Col>
                        {(!formStore.isSubmitted || showSaveButton)
                            && <Button onClick={() => formStore.submitForm()} color="primary"> Submit </Button>}
                    </Col>
                    <Col>
                        {(formStore.isSubmitted || showResetButton)
                            && <Button onClick={() => formStore.resetForm()} color="primary"> Reset </Button>
                        }
                    </Col>
                </Row>
            </Form>
        </FormStoreContext.Provider>
    )
}

export default observer(ReactForm);