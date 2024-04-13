import React, {useState} from 'react';
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

    // const redirectToHome = () => {
    //     navigate('/home', { state : {mainPassword: "password", name: "Ibrahim" }})
    // }

    return (
        <>
            <div style={{width: '100%', height: '100vh', backgroundColor:"rgb(248, 249, 250)"}}>
            <Container>
                <Row sm={4} style={{}}>
                    <div style={{marginTop: "10px", backgroundColor:"rgb(248, 249, 250)"}}>
                        <FormInput title={"Login"} onUpdateInput={setName} placeHolder={"Login"}></FormInput>
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <PasswordInput onUpdatePassword={setPassword} placeholder={"Password"}></PasswordInput>
                    </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', margin: 'auto'}}>
                            <Button onClick={login}
                                    variant="primary" style={{marginTop: '5px', marginBottom: '10px', width: "100%"}}>Login</Button>
                            <div onClick={redirectToRegister} style={{width: "100%"}}>
                                <Form.Text id="Title" style={{ color: 'black', cursor: 'pointer', textDecoration: "underline" }}>
                                    Register now
                                </Form.Text>
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
