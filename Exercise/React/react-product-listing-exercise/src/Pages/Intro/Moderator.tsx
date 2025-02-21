import {Col, Container, Row} from "reactstrap";
import Home from "../Home/Home.tsx";

export default function Moderator({setProducts}: any) {
    return (
        <Container>
            <Row className={"justify-content-center mt-lg-5"}>
                <Col>
                    <h1>Hello Moderator</h1>
                    <Home setProducts={setProducts} />
                </Col>
            </Row>
        </Container>
    )
}