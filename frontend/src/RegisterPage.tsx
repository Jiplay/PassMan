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


type PasswordExigence = {
    length: boolean;
    letters: boolean;
    special: boolean;
}

function RegisterPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const navigate = useNavigate();

    async function register() {

        if (password === passwordCheck) {
            let res = await Register(name, password)
            if (res == "false") {
                toast.error("Registration failed")
            } else if (res == "true") {
                toast.success("Registration success")
                navigate('/');
            }
        } else {
            toast.error("Passwords don't match")
        }
    }

    function isPasswordLongEnough() {

    }

    const redirectToHome = () => {
        navigate('/');
    };

    return (
        <>
            <div style={{backgroundColor: 'rgb(29, 37, 53)', minHeight: '100vh'}}>
                <Container>
                    <Row>
                        <Form.Text id="passwordHelpBlock" style={{ color: 'white', fontSize:"30px" }}>
                            Join the 5 people who are safe thanks to PassMan 😎
                        </Form.Text>
                        <Col sm={4} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100vh'
                        }}>
                            <div style={{margin: 'auto'}}>
                                <FormInput title={"Login"} onUpdateInput={setName} placeHolder={"Login"}></FormInput>
                                <PasswordInput onUpdatePassword={setPassword} placeholder={"Password"}></PasswordInput>
                                <Form.Text id="passwordHelpBlock" style={{ color: 'white' }}>
                                    Your password must be 13-20 characters long, contain letters and numbers,
                                    and at least 1 special characters,
                                    and must not contain spaces, or emoji.
                                </Form.Text>
                                <div style={{marginTop: "20px"}}>

                                    <PasswordInput onUpdatePassword={setPasswordCheck} placeholder={"Retype it, just in case"}></PasswordInput>
                                </div>
                                <br/>
                                <Form.Text id="passwordHelpBlock" style={{ color: 'white' }}>
                                    ⚠️ Warning, make sure to remember your password ⚠️
                                </Form.Text>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', margin: 'auto'}}>
                                <Button style={{margin: 'auto', marginRight: '20px'}} onClick={register} variant="primary">Register</Button>
                                <Button style={{margin: 'auto'}} onClick={redirectToHome} variant="secondary">Login</Button>
                            </div>
                        </Col>
                        <Col sm={8}>
                        <img src={logo} id="logo" alt="logo" width={"300px"} style={{marginTop: "20px", marginBottom: "50px"}}/>
                            <h4 style={{color: 'white', marginBottom: "30px"}}>
                                Welcome everyone ! 🎉
                            </h4>
                            <Form.Text id="presentationText" style={{ color: 'white', fontSize:" 18px" }}>
                                This is Alpha version of my OWN password manager. Data is stored online in a safe database :)
                                There is a presentation in the Info page for the curious out there, the technologies, the hows etc..
                                But this is more a test, I'll probably use it myself with time, but for now it's just a
                                cool project that I'm developing alone :)
                            </Form.Text>
wails                         </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default RegisterPage
