import { Card, CardBody, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import {IProduct} from "../../Types/UtilityTypes.tsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../App.tsx";
import AddToCartButton from "./AddToCartButton.tsx";

export default function ProductCard({product}:{product: IProduct}){
    const [quantity, setQuantity] = useState<number>(product.quantity || 0);
    const [,, userID] = useContext(UserContext);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem(`${userID}`) || "[]");
        const existingProduct = storedCart.find((p: IProduct) => p.id === product.id);
        if(existingProduct){
            setQuantity( existingProduct.quantity);
        }
        else{
            setQuantity( product.quantity || 0 );
        }
    }, [userID]);

    function handleAddToCart() {
        const storedCart = JSON.parse(localStorage.getItem(`${userID}`) || "[]");
        const existingProduct = storedCart.find((p: IProduct) => p.id === product.id);
        if(existingProduct){
            existingProduct.quantity += 1;
        }
        else{
            storedCart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem(`${userID}`, JSON.stringify(storedCart));
        setQuantity(prev => prev+1);
    }

    function handleDecreaseFromCart() {
        const storedCart = JSON.parse(localStorage.getItem(`${userID}`) || "[]");
        const existingProduct = storedCart.find((p: IProduct) => p.id === product.id);
        if(existingProduct){
            existingProduct.quantity -= 1;
            localStorage.setItem(`${userID}`, JSON.stringify(storedCart));
            if (existingProduct.quantity === 0){
                handleRemoveItemFromCart();
                return;
            }
        }
        else
            return
        setQuantity(prev => prev-1);
    }
    function handleRemoveItemFromCart() {
        const storedCart = JSON.parse(localStorage.getItem(`${userID}`) || "[]");
        localStorage.setItem(`${userID}`, JSON.stringify(storedCart?.filter(cart => cart.id != product.id)));
        setQuantity(0);
    }
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
                            {product?.description?.slice(0, 90)}{product?.description?.length > 90 ? "..." : ""}
                        </CardText>
                    </CardBody>
                </Col>
                <Col md={2}>
                    <CardBody>
                        <CardText>
                            <strong>${(product.price - (product.price * product.discountPercentage) / 100).toFixed(3)}</strong>{" "}<s>(${product.price})</s>
                        </CardText>
                        <AddToCartButton quantity={quantity} handleAddToCart={handleAddToCart} handleDecreaseFromCart={handleDecreaseFromCart} handleRemoveItemFromCart={handleRemoveItemFromCart} />
                    </CardBody>
                </Col>
            </Row>
        </Card>
    )
}