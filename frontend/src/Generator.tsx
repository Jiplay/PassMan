import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button} from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import NavBarHome from "./components/NavBar";
import { BsFileLock2Fill } from "react-icons/bs";
import { GenerateSafePassword } from "../wailsjs/go/main/App";


interface LocationState {
    mainPassword: string;
    name: string
}

import { BsFillShieldLockFill } from "react-icons/bs";
import NbInput from "./components/NbInput";

interface ListItem {
    Website: string;
    Login: string;
    Password: string;
    Additional: string;
}

const Generator: React.FC = () => {
    const location = useLocation();
    const { mainPassword, name } = location.state as LocationState|| {};
    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    const [lenPassword, setLenPassword] = useState(22)

    function fetchNewPassword(update: string) {
        console.log("unused")
    }

    async function GenerateAnother() {
        let resp = await GenerateSafePassword(lenPassword)
        setPassword(resp)
    }

    useEffect(() => {
        GenerateAnother()
    }, []);

    return (
        <>
            <NavBarHome username={name} password={mainPassword}  onUpdatePassword={fetchNewPassword}/>
            <Row>
                <Col sm={3} style={{backgroundColor: "rgb(29, 37, 53)", height: "90vh", width: "10%"}}>
                    <div onClick={() => {
                        navigate('/home', {state: {mainPassword: mainPassword, name: name}})
                    }}>
                        <BsFileLock2Fill style={{fontSize: "50px", color: "white", marginTop: "25px"}}/>
                    </div>
                    <BsFillShieldLockFill style={{fontSize: "50px", color: "white", marginTop: "50px"}}/>
                </Col>
                <Col style={{
                    backgroundColor: "rgb(248, 249, 250)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div style={{}}>
                        <h1 style={{marginBottom: "40px"}}> Generate Safe Password</h1>
                        <p>{password}</p>
                        <div style={{marginTop: "40px"}}>
                        <Button style={{marginRight: "40px"}} onClick={GenerateAnother}> Another one</Button>
                        <NbInput value={lenPassword} onChange={setLenPassword} />
                        </div>
                        <p style={{marginTop: "40px"}}>
                            Advice of PassMan : Your password should never be less than 20 characters
                        </p>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Generator;
