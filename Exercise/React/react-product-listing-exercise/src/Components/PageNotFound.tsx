import {Button, Col, Container, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <Container>
            <Row className="mt-lg-5">
                <Col>
                    <h1>Page Not Found</h1>
                    <Button onClick={() => navigate('/')}> Click here to to go back</Button>
                </Col>
            </Row>
        </Container>
    )
}