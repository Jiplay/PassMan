import {useState} from 'react';
import {Login} from "../wailsjs/go/main/App";
import PassMan from './assets/images/PassMan.png'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button, Image} from "react-bootstrap";
import PasswordInput from "./components/PasswordForm";
import FormInput from "./components/Form";
import {useNavigate} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

function LoginPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login() {
        let res: string = await Login(name, password)
        if (res === "true") {
            navigate('/home', { state : {mainPassword: password, name: name }});
        } else {
            toast.error("Unable to login.")
        }
    }
    const redirectToRegister = () => {
        navigate('/register');
    };

    return (
        <>
            <div style={{backgroundColor: 'rgb(29, 37, 53)', minHeight: '100vh'}}>
                <Container>
                    <Row>
                        <Col sm={5} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Image src={PassMan} width={"300px"}></Image>
                        </Col>
                        <Col sm={5}>
                            <h1 style={{color: 'white'}}> Login here</h1>
                            <div style={{margin: 'auto', marginTop: '45%'}}>
                                <FormInput title={"Login"} onUpdateInput={setName} placeHolder={"Login"}></FormInput>
                                <PasswordInput onUpdatePassword={setPassword} placeholder={"Password"}></PasswordInput>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', marginTop: '5%'}}>
                                <Button onClick={login}
                                        variant="primary">Login</Button>
                            </div>
                            <div style={{marginTop: '10%'}}>
                                <p style={{color: 'white'}}>
                                    You don't have an account yet ?
                                </p>
                                <Button style={{margin: 'auto'}} onClick={redirectToRegister}
                                        variant="secondary">Register</Button>
                            </div>
                        </Col>
                        <Col sm={2}>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default LoginPage
