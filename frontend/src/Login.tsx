import React, {useState} from 'react';
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
import Form from "react-bootstrap/Form";

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
            <div style={{backgroundColor: 'rgb(248, 249, 250)', minHeight: '100vh'}}>
                <Container>
                    <Row>
                        <Col style={{
                            flexDirection: 'column',
                            justifyContent: 'right',
                            backgroundColor: 'rgb(0, 90, 146)',
                            height: '90vh',
                            marginTop: '20px',
                            maxWidth: "60%",
                            borderRadius: '10px'}}>
                                <Form.Text id="passwordHelpBlock" style={{ color: 'white', fontSize:"30px" }}>
                                    Login right here to access your passwords 😎
                                </Form.Text>
                            <div style={{margin: 'auto', marginTop: '30%', maxWidth: "80%"}}>
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
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default LoginPage
