import {Col, Container, Row} from "reactstrap";
import Home from "../Home/Home.tsx";

export default function Moderator() {
    return (
        <Container>
            <Row className={"justify-content-center mt-lg-5"}>
                <Col>
                    <h1>Hello Moderator</h1>
                    <Home />
                </Col>
            </Row>
        </Container>
    )
}