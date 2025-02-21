import {Button, ButtonGroup, Col} from "reactstrap";
import {MouseEventHandler} from "react";
export default function AddToCartButton({quantity, handleAddToCart, handleDecreaseFromCart, handleRemoveItemFromCart} : { quantity : number, handleAddToCart : MouseEventHandler, handleDecreaseFromCart : MouseEventHandler, handleRemoveItemFromCart : MouseEventHandler}){
    return(
        <>
            {quantity > 0  ? (
                <Col>
                    <ButtonGroup>
                        <Button color="danger" onClick={handleDecreaseFromCart} size="sm">-</Button>
                        <Button color="primary" outline disabled> {quantity} </Button>
                        <Button color="success" onClick={handleAddToCart} size="sm">+</Button>
                    </ButtonGroup>
                    <Button color="danger" onClick={handleRemoveItemFromCart} className="mt-1" size="sm">Remove Item</Button>
                </Col>
            ) : (
                <Button onClick={handleAddToCart} color="primary">Add to Cart</Button>
            )}
        </>
    )
}