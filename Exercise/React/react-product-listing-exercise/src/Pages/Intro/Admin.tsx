import {Col, Container, Row} from "reactstrap";
import Home from "../Home/Home.tsx";

export default function Admin() {
    return (
        <Container>
            <Row className={"justify-content-center mt-lg-5"}>
                <Col>
                    <h1>Hello Admin</h1>
                    <Home />
                </Col>
            </Row>
        </Container>
    )
}