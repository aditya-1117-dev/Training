import {FormStoreContext, IProductData} from "../Context/FormContext.tsx";
import {Button, Col, Form as ReactStrapForm, Row} from "reactstrap";
import {observer} from "mobx-react-lite";
import {ReactNode} from "react";
import {FormStore} from "../Stores/formStore.tsx";

interface IForm {
    showSaveButton?: boolean,
    showResetButton?: boolean,
    children: ReactNode,
    formStore: FormStore<IProductData>
}

function Form({showSaveButton, showResetButton, children, formStore}: IForm) {
    return (
        <FormStoreContext.Provider value={formStore}>
            <ReactStrapForm>
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
            </ReactStrapForm>
        </FormStoreContext.Provider>
    )
}
export default observer(Form);