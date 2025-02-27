import {useContext, useEffect, useRef} from "react";
import {observable} from "mobx";
import {FormStore} from "../../stores/formStore.tsx";
import {StringField} from "../../Components/InputFields.tsx";
import Form from "../../Components/Form.tsx";
import {Col, Container, Row} from "reactstrap";
import postRequest from "../../Utility/postRequest.tsx";
import getRequest from "../../Utility/getRequest.tsx";
import {UserContext} from "../../App.tsx";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

export interface ILogin {
    username: string;
    password: string;
}
export const loginInfo: ILogin = {
    username: '',
    password: '',
}

class loginRootStore{
    @observable loginFormStore ;

    constructor( setCurrentUser : any, navigate : any) {
        this.loginFormStore = new FormStore<ILogin>(loginInfo);

        this.loginFormStore.setOnSubmitCallBack( async (data: any) => {
            const {username, password } = data;
            try {
                this.loginFormStore.setSubmission(true);
                const response = await postRequest('https://dummyjson.com/auth/login', {username, password});
                const user = await getRequest(`https://dummyjson.com/auth/me`, {'Authorization': `Bearer ${response.accessToken}`,});
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("role", user.role);
                setCurrentUser( ()=> user.username);
                this.loginFormStore.resetForm();
                navigate(`/${user.role}`);
            }catch (e) {
                console.log(e)
            }
            finally {
                this.loginFormStore.setSubmission(false);
            }
        });
    }
}

function Login() {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    const loginStore = useRef<loginRootStore | null>(null);
    const [, setCurrentUser,] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        loginStore.current =  new loginRootStore(setCurrentUser, navigate);
        if (token && role) {
            location.href=role;
            return;
        }
    }, []);

    return (
        <Container>
            <Row className="justify-content-center mt-5" >
                <Col className={'text-center'} md={6}>
                    <Form<ILogin> formStore={loginStore.current?.loginFormStore}>
                        <StringField name={"username"} required={true} label={"Username : "} />
                        <StringField name={"password"} required={true} label={"Password: "} />
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default observer(Login);