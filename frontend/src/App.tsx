import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import {Greet} from "../wailsjs/go/main/App";
import {Register} from "../wailsjs/go/main/App";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PasswordInput from "./components/PasswordForm";
import FormInput from "./components/Form";
import {Button} from "react-bootstrap";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updatePassword = (e: any) => setPassword(e.target.value);
    let resp;
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    async function register() {
        resp = await Register(name, password)
        console.log(resp);
    }

    return (
        <>
        <div>
            <Container>
                <Row>
                    <Col sm={4} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh'}}>
                        <div style={{margin: 'auto'}}>
                            <FormInput title={"Login"} onUpdateInput={updateName}></FormInput>
                            <PasswordInput onUpdatePassword={setPassword}></PasswordInput>
                        </div>
                        <Button style={{margin: 'auto'}}onClick={register} variant="primary">Register</Button>
                    </Col>
                    <Col sm={8}>
                        <img src={logo} id="logo" alt="logo" width={"400px"}/>
                        <h4 style={{color: 'white'}}>
                            Welcome everyone !
                        </h4>
                        <p style={{color: 'lightslategrey'}}>
                            This is the 1st version of my OWN password manager. Before registrating into it you need to
                            know how I store information. This is, more a First Project with Go & Wails than a startup
                            product.
                            But I'm doing my best to apply what I've learn during my past experiences.
                        </p>
                        <p style={{color: 'lightslategrey'}}>
                            For the curious out there, this project is built with Wails, which is an amazing thing that allows
                            Go developers to create desktop application with Typescript as Frontend. Every password stored on this application
                            is encoded with Bcrypt and store in MongoDB Atlas. With this encryption, I can NOT know your passwords.
                            It's called a one way function, what I'm doing when you login is to apply the same thing that I apply to your 1st password and
                            compared the results
                        </p>
                        <p style={{color: 'lightslategrey'}}>
                            But this is more a test, I'll probably use it myself with time, but for now it's just a cool project that I'm developing alone :)
                        </p>

                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}

export default App

// <div id="App">
//     <img src={logo} id="logo" alt="logo"/>
//     <div id="result" className="result">Login now in PassMan ! 👇</div>
//     <div id="input" className="input-box">
//         <input id="name" className="input" onChange={updateName} autoComplete="off" name="inputLogin" type="text"/>
//     </div>
//     <div id="input" className="input-box">
//         <input id="password" className="input" style={{marginTop: "20px"}} onChange={updatePassword} autoComplete="off" name="inputPassword" type="text"/>
//     </div>
//         <button className="btn" onClick={greet}>Greet</button>
//         <button className="btn" onClick={register}>Register</button>
// </div>