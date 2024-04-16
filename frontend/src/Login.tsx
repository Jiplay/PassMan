import React, {useEffect, useState} from 'react';
import {Login} from "../wailsjs/go/main/App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button} from "react-bootstrap";
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
    const [autoLogin, setAutoLogin] = useState(false);
    const navigate = useNavigate();

    async function login() {
        let res: string = await Login(name, password)
        if (res === "true") {
            if (autoLogin) {
                localStorage.setItem("ID", JSON.stringify({Login: name, Password: password}));
            }
            navigateToHome(name, password)
        } else {
            toast.error("Unable to login.")
        }
    }
    function getData(key:string) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    const handleAutoLoginChange = () => {
        setAutoLogin(!autoLogin);
    };

    const redirectToRegister = () => {
        navigate('/register');
    };

    function navigateToHome(name: string, password: string) {
        navigate('/home', { state : {mainPassword: password, name: name }});
    }

    useEffect(() => {
        const autoLogin = async () => {
            const creds = getData("ID")
            if (creds.Login !== "" && creds.Password !== "") {
                navigateToHome(creds.Login, creds.Password)
            }
        };

        autoLogin();

        // Cleanup function to cancel any pending requests or subscriptions
        return () => {
            // cleanup code here if needed
        };
    }, []);

    return (
        <>
            <div style={{width: '100%', height: '100vh', backgroundColor:"rgb(248, 249, 250)"}}>
            <Container>
                <Row sm={4} style={{}}>
                    <div style={{marginTop: "10px", backgroundColor: "rgb(248, 249, 250)"}}>
                        <FormInput title={"Login"} onUpdateInput={setName} placeHolder={"Login"}></FormInput>
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <PasswordInput onUpdatePassword={setPassword} placeholder={"Password"}></PasswordInput>
                    </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', margin: 'auto'}}>
                            <Button onClick={login}
                                    variant="primary" style={{marginTop: '5px', marginBottom: '10px', width: "100%"}}>Login</Button>
                            <div style={{display:"flex", justifyContent: 'center'}}>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Auto-Login" onClick={handleAutoLoginChange} />
                                </Form.Group>
                                <div onClick={redirectToRegister} style={{marginLeft: "10px"}}>
                                    <Form.Text id="Title" style={{ color: 'black', cursor: 'pointer', textDecoration: "underline" }}>
                                        Register now
                                    </Form.Text>
                                </div>
                            </div>
                        </div>
                </Row>
                <Col xl={8} style={{
                    height: 'calc(100vh - 20px)',
                    marginTop: '20px',
                    borderRadius: '10px'}}>
                    <iframe src={"https://jgblog.vercel.app/"} width="100%" height="100%"/>
                </Col>
            </Container>
            </div>
        </>
    )
}

export default LoginPage
