import {FormStore} from "../../stores/formStore.tsx";
import {StringField} from "../../Components/InputFields.tsx";
import Form from "../../Components/Form.tsx";
import '../../App.css'
import {Col, Container, Row} from "reactstrap";
import postRequest from "../../Utility/postRequest.tsx";
import getRequest from "../../Utility/getRequest.tsx";
import {useEffect} from "react";

export interface ILogin {
    username: string;
    password: string;
}
export const loginInfo: ILogin = {
    username: '',
    password: '',
}
export const loginFormStore = new FormStore<ILogin>(loginInfo);

export default function Login() {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    useEffect(() => {
        loginFormStore.setOnSubmitCallBack( async (data: any) => {
            const {username, password } = data;
            try {
                const response = await postRequest('https://dummyjson.com/auth/login', {username, password});
                const user = await getRequest(`https://dummyjson.com/auth/me`, {'Authorization': `Bearer ${response.accessToken}`,});
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("role", user.role);
                location.href=user.role;
                loginFormStore.resetForm();
            }catch (e) {
                console.log(e)
            }
        });
        if (token && role) {
            location.href=role;
            return;
        }
    }, []);

    return (
        <Container>
            <Row className="justify-content-center mt-5" >
                <Col md={12}>
                    <Form formStore={loginFormStore}>
                        <StringField name={"username"} required={true} label={"Username : "} />
                        <StringField name={"password"} required={true} label={"Password: "} />
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}