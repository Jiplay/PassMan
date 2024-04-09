import React, { useState} from 'react';
import {Register} from "../wailsjs/go/main/App";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button, Image} from "react-bootstrap";
import PasswordInput from "./components/PasswordForm";
import FormInput from "./components/Form";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Form from "react-bootstrap/Form";
import FactsCards from "./components/FactsCards";
import PassManComics from "./assets/images/PassManComics.png";
import passwordTipsData from './assets/const/facts.json';

type Facts = {
    name: string;
    description: string;
};

type FactsCardsProps = {
    facts: Facts[];
};

function RegisterPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const navigate = useNavigate();


    const passwordTips: Facts[] = passwordTipsData.password_security_tips.map((tip) => ({
        name: tip.title,
        description: tip.description,
    }));

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

    const redirectToHome = () => {
        navigate('/');
    };

    return (
        <>
            <div style={{backgroundColor: 'rgb(248, 249, 250)', minHeight: '100vh'}}>
                <Container>
                    <Row>
                        <Form.Text id="passwordHelpBlock" style={{ color: 'black', fontSize:"30px" }}>
                            Join the 5 people who are safe thanks to PassMan 😎
                        </Form.Text>
                        <Col sm={4} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            backgroundColor: 'rgb(29, 37, 53)',
                            height: '100vh',
                            borderRadius: '10px'
                        }}>
                            <div style={{margin:"auto"}}>

                                <h3 style={{color: 'white', marginBottom: "10%"}}>Your info here 📝</h3>

                                <FormInput title={"Login"} onUpdateInput={setName} placeHolder={"Login"}></FormInput>
                                <PasswordInput onUpdatePassword={setPassword} placeholder={"Password"}></PasswordInput>
                                <Form.Text id="passwordRequirements" style={{color: 'white'}}>
                                    <ul>
                                        <li>Your password must be 13-20 characters long</li>
                                        <li>Contain letters and numbers</li>
                                        <li>Contain at least 1 special character</li>
                                    </ul>
                                </Form.Text>
                                <div style={{marginTop: "20px"}}>
                                    <PasswordInput onUpdatePassword={setPasswordCheck}
                                                   placeholder={"Retype it, just in case"}></PasswordInput>
                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', margin: 'auto'}}>
                                <Button style={{margin: 'auto', marginRight: '20px'}} onClick={register} variant="primary">Register</Button>
                                <Button style={{margin: 'auto'}} onClick={redirectToHome} variant="secondary">Login</Button>
                            </div>
                        </Col>
                        <Col sm={8} style={{backgroundColor:"rgb(248, 249, 250)"}}>
                            <Image src={PassManComics} width={"400px"}></Image>
                            <FactsCards facts={passwordTips} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default RegisterPage
