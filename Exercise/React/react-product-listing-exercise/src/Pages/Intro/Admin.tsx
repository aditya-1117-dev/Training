import {Col, Container, Row} from "reactstrap";
import Home from "../Home/Home.tsx";
import {Dispatch, SetStateAction} from "react";
import {IProduct} from "../../Types/UtilityTypes.tsx";

export default function Admin({setProducts} : {setProducts : Dispatch<SetStateAction<IProduct[]>>}) {
    return (
        <Container>
            <Row className={"justify-content-center text-center mt-lg-5"}>
                <Col>
                    <h1>Hello Admin</h1>
                    <Home setProducts={setProducts} />
                </Col>
            </Row>
        </Container>
    )
}