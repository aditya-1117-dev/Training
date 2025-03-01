import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import {UserContext} from "../../App.tsx";
import {IProduct} from "../../Types/UtilityTypes.tsx";
import AddToCartButton from "./AddToCartButton.tsx";

export default function ProductCard({product, setProducts}:{product: IProduct, setProducts : Dispatch<SetStateAction<IProduct[]>> | undefined }){
    const [quantity, setQuantity] = useState<number>(product.quantity || 0);
    const {userID} = useContext(UserContext);

    const updateCart = (updatedCart: IProduct[]) => {
        localStorage.setItem(`${userID}`, JSON.stringify(updatedCart));
        if (setProducts){
            setProducts(updatedCart);
        }
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem(`${userID}`) || "[]");
        const existingProduct = storedCart.find((p: IProduct) => p.id === product.id);
        if(storedCart && existingProduct){
            setQuantity( existingProduct.quantity);
        }
        else{
            setQuantity( product.quantity || 0 );
        }
    }, [userID]);

    function handleAddToCart() {
        const storedCart = JSON.parse(localStorage.getItem(`${userID}`) || "[]");
        const existingProduct = storedCart.find((p: IProduct) => p.id === product.id);
        if (storedCart && existingProduct) {
            existingProduct.quantity += 1;
        } else {
            storedCart.push({ ...product, quantity: 1 });
        }
        updateCart(storedCart);
        setQuantity(prev => prev + 1);
    }

    function handleDecreaseFromCart() {
        const storedCart = JSON.parse(localStorage.getItem(`${userID}`) || "[]");
        const existingProduct = storedCart.find((p: IProduct) => p.id === product.id);
        if (storedCart && existingProduct) {
            existingProduct.quantity -= 1;
            if (existingProduct.quantity === 0) {
                handleRemoveItemFromCart();
                return;
            }
            updateCart(storedCart);
        }
        setQuantity(prev => prev - 1);
    }
    function handleRemoveItemFromCart() {
        const storedCart = JSON.parse(localStorage.getItem(`${userID}`) || "[]");
        const updatedCart = storedCart.filter((cart: IProduct) => cart.id !== product.id);
        updateCart(updatedCart);
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