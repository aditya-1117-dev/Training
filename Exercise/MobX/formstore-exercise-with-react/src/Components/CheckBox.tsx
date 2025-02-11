import { Col, FormGroup, Input, Row} from "reactstrap";
import {observer} from "mobx-react-lite";
import {ChangeEventHandler} from "react";

const CheckBox = ({id, value, onchange} :{id : number, value : boolean, onchange : ChangeEventHandler} ) => {
    return (
        <FormGroup>
            <Row key={id} className="align-items-center">
                <Col xs="auto">
                    <Input type="checkbox" onChange={onchange} checked={value} />
                </Col>
            </Row>
        </FormGroup>
    );
};

export default observer(CheckBox);
