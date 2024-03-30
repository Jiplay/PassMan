import React, {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import {Register} from "../wailsjs/go/main/App";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button} from "react-bootstrap";
import PasswordInput from "./components/PasswordForm";
import FormInput from "./components/Form";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Form from "react-bootstrap/Form";

function RegisterPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function register() {
        let res = await Register(name, password)
        if (res == "false") {
            toast.error("Registration failed")
        } else if (res == "true") {
            toast.success("Registration success")
            navigate('/login');
        }
    }
    const redirectToHome = () => {
        navigate('/login');
    };

    return (
        <>
            <div style={{backgroundColor: 'rgb(29, 37, 53)', minHeight: '100vh'}}>
                <Container>
                    <Row>
                        <Col sm={4} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100vh'
                        }}>
                            <h1 style={{color: 'white'}}> Register here</h1>
                            <div style={{margin: 'auto'}}>
                                <FormInput title={"Login"} onUpdateInput={setName} placeHolder={"Login"}></FormInput>
                                <PasswordInput onUpdatePassword={setPassword}></PasswordInput>
                                <Form.Text id="passwordHelpBlock" style={{ color: 'white' }}>
                                    Your password must be 13-20 characters long, contain letters and numbers,
                                    and at least 1 special characters,
                                    and must not contain spaces, or emoji.
                                </Form.Text>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', margin: 'auto'}}>
                                <Button style={{margin: 'auto', marginRight: '20px'}} onClick={register} variant="primary">Register</Button>
                                <Button style={{margin: 'auto'}} onClick={redirectToHome} variant="primary">Login</Button>
                            </div>
                        </Col>
                        <Col sm={8}>
                        <img src={logo} id="logo" alt="logo" width={"400px"}/>
                            <h4 style={{color: 'white'}}>
                                Welcome everyone !
                            </h4>
                            <p style={{color: 'lightslategrey'}}>
                                This is the 1st version of my OWN password manager. Before registrating into it you need
                                to
                                know how I store information. This is, more a First Project with Go & Wails than a
                                startup
                                product.
                                But I'm doing my best to apply what I've learn during my past experiences.
                            </p>
                            <p style={{color: 'lightslategrey'}}>
                                For the curious out there, this project is built with Wails, which is an amazing thing
                                that allows
                                Go developers to create desktop application with Typescript as Frontend. Every password
                                stored on this application
                                is encoded with Bcrypt and store in MongoDB Atlas. With this encryption, I can NOT know
                                your passwords.
                                It's called a one way function, what I'm doing when you login is to apply the same thing
                                that I apply to your 1st password and
                                compared the results
                            </p>
                            <p style={{color: 'lightslategrey'}}>
                                But this is more a test, I'll probably use it myself with time, but for now it's just a
                                cool project that I'm developing alone :)
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default RegisterPage
