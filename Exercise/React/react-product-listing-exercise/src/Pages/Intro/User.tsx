import {Col, Container, Row} from "reactstrap";
import Home from "../Home/Home.tsx";

export default function User() {
    return (
        <Container>
            <Row className={"justify-content-center mt-lg-5"}>
                <Col>
                    <h1>Hello User</h1>
                    <Home />
                </Col>
            </Row>
        </Container>
    )
}