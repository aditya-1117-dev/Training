import {Button, Col, Container, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";

export default function UserNotAuthorized() {
    const navigate = useNavigate();
    return (
        <Container>
            <Row className="mt-lg-5">
                <Col>
                    <h1>User not authorized</h1>
                    <Button onClick={() => navigate(-1)}> Click here to to go back</Button>
                </Col>
            </Row>
        </Container>
    )
}