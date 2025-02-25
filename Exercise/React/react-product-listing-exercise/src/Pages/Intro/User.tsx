import {Col, Container, Row} from "reactstrap";
import Home from "../Home/Home.tsx";
import {Dispatch, SetStateAction} from "react";
import {IProduct} from "../../Types/UtilityTypes.tsx";

export default function User({setProducts} : {setProducts : Dispatch<SetStateAction<IProduct[]>>}) {
    return (
        <Container>
            <Row className={"justify-content-center mt-lg-5"}>
                <Col>
                    <h1>Hello User</h1>
                    <Home setProducts={setProducts} />
                </Col>
            </Row>
        </Container>
    )
}