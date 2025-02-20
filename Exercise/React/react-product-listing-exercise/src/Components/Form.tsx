import {Button, Col, Form as ReactStrapForm, Row} from "reactstrap";
import {observer} from "mobx-react-lite";
import {ReactNode} from "react";
import {IProductData} from "../Pages/AddNewProduct/ProductForm.tsx";
import {FormStore} from "../stores/formStore.tsx";
import { formStoreContext } from "../context/formContext.tsx";

interface IForm {
    showSaveButton?: boolean,
    showResetButton?: boolean,
    children: ReactNode,
    formStore: FormStore<IProductData>
}

function Form({showSaveButton, showResetButton, children, formStore}: IForm) {
    if (!formStore){
        return <> Form Store Not Provided</> ;
    }
    if (Object.keys(formStore.formData).length === 0){
        return <> Form does not have initialized data</> ;
    }
    const isFormSubmitted = formStore.isSubmitted;
    return (
        <formStoreContext.Provider value={formStore}>
            <ReactStrapForm>
                {children}
                <Row>
                    <Col>
                        {(!isFormSubmitted || showSaveButton)
                            && <Button onClick={() => formStore.submitForm()} color="primary" disabled={isFormSubmitted}> Submit </Button>}
                    {/*</Col>*/}
                    {/*<Col>*/}
                        {(isFormSubmitted || showResetButton)
                            && <Button onClick={() => formStore.resetForm()} color="primary"> Reset </Button>
                        }
                    </Col>
                </Row>
            </ReactStrapForm>
        </formStoreContext.Provider>
    )
}
export default observer(Form);