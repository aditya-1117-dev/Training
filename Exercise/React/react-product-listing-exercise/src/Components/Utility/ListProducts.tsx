import {IProduct} from "../Types/UtilityTypes.tsx";
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";

export default function ListProducts({ products} : { products : IProduct[]}) {
    return (
        <Col md={8} style={{ margin: "0 auto" }}>
            {products && products.map((product) => {
                return (
                    <Card key={product.id} className="mb-3">
                        <Row className="g-0 align-items-center">
                            <Col md={2}>
                                <CardImg src={product.thumbnail} alt={product.title} className="img-fluid"/>
                            </Col>
                            <Col md={8}>
                                <CardBody>
                                    <CardTitle tag="h5">{product.title}</CardTitle>
                                    <CardText>
                                        <small className="text-muted">{product.category}</small>
                                    </CardText>
                                    <CardText>
                                        {product.description.slice(0, 90)}{product.description.length > 90 ? "..." : ""}
                                    </CardText>
                                </CardBody>
                            </Col>
                            <Col md={2}>
                                <CardBody>
                                    <CardText>
                                        <strong>${(product.price - (product.price * product.discountPercentage) / 100).toFixed(3)}</strong>{" "}<s>(${product.price})</s>
                                    </CardText>
                                    <Button color="primary">Add to Cart</Button>
                                </CardBody>
                            </Col>
                        </Row>
                    </Card>
                    )
                })
            }
        </Col>
    )
}