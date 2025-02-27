import {observer} from "mobx-react-lite";
import {Col, Container, Row} from "reactstrap";
import {FormStore} from "../../stores/formStore.tsx";
import Form from "../../Components/Form.tsx";
import { NumberField, StringField} from "../../Components/InputFields.tsx";
import {useNavigate} from "react-router-dom";

export interface IProductData {
    title: string,
    category: string,
    price: number,
    discountPercentage: number,
    tags: string[],
    thumbnail: string,
    rating: number,
    description: string,
    stock: string,
}
export const formData: IProductData = {
    title: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    tags: [""],
    thumbnail: "",
    rating: 0,
    description: "",
    stock: "",
};

export const formStore = new FormStore<IProductData>(formData);

function ProductForm() {
    const navigate = useNavigate();
    formStore.setOnSubmitCallBack((data: any) => {
        const storedProducts = JSON.parse(localStorage.getItem(`products`) || "[]");
        if (data) storedProducts.push({...data, quantity: 0});
        localStorage.setItem(`products`, JSON.stringify(storedProducts) );
        formStore.resetForm();
        const role = localStorage.getItem('role');
        navigate(`/${role}`);
    });
    return (
        <Container>
            <h2 className={'text-center m-xl-5'}> Add New Product Form </h2>
            <Row>
                <Col className={'text-center'}>
                    <Form formStore={formStore}>
                        <StringField name="title" label="Product Title" required={true} />
                        <StringField name="category" label="Product Category" required={true} />
                        <StringField name="thumbnail" label="Product Image Link" required={true} />
                        <StringField name="discountPercentage" label="Discount on Product (in percentage)" required={true} />
                        <NumberField name="price" label="Price of the product" required={true}/>
                        <StringField name="description" label="Product Description :" required={true}/>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default observer(ProductForm);