import {Button, Col, Form as ReactStrapForm, Row} from "reactstrap";
import {observer} from "mobx-react-lite";
import {ReactNode} from "react";
import {FormStore} from "../stores/formStore.tsx";
import { formStoreContext } from "../context/formContext.tsx";
import Loader from "./Loader/Loader.tsx";

interface IForm<T> {
    showSaveButton?: boolean,
    showResetButton?: boolean,
    children: ReactNode,
    formStore: FormStore<T> | undefined
}

function Form<T>({showSaveButton, showResetButton, children, formStore}: IForm<T>) {
    if (!formStore){
        console.log('Form Store Not Provided')
        return <></> ;
    }
    if (Object.keys(formStore.formData as object).length === 0){
        console.log('Form does not have initialized data')
        return <></> ;
    }
    const isFormSubmitted = formStore.isSubmitted;
    return (
        <formStoreContext.Provider value={formStore} >
            <ReactStrapForm>
                {children}
                <Row>
                    {formStore.submitting
                        ?
                        <Col>
                            <Loader height={50} width={50} />
                        </Col>
                        :
                        <Col>
                            {(!isFormSubmitted || showSaveButton)
                                && <Button onClick={() => formStore.submitForm()} color="primary" disabled={isFormSubmitted}> Submit </Button>}
                            {/*</Col>*/}
                            {/*<Col>*/}
                            {(isFormSubmitted || showResetButton)
                                && <Button onClick={() => formStore.resetForm()} color="primary"> Reset </Button>
                            }
                        </Col> }
                </Row>
            </ReactStrapForm>
        </formStoreContext.Provider>
    )
}
export default observer(Form);