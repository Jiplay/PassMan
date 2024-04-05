import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button, Image} from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import NavBarHome from "./components/NavBar";
import { BsFileLock2Fill, BsFillInfoCircleFill, BsFillShieldLockFill } from "react-icons/bs";
import PassManComics from "./assets/images/PassManComics.png";
import ListView from "./components/ListView";
import {DecryptPsw, GetPasswordForUser} from "../wailsjs/go/main/App";

// @ts-ignore  Strange but necessary, works in prod mode
import {mongodb} from '../models';
import {toast} from "react-toastify"
import Menu from "./components/Menu";


interface LocationState {
    mainPassword: string;
    name: string
}

const Home: React.FC = () => {
    const location = useLocation();
    const { mainPassword, name } = location.state as LocationState|| {};
    const [websites, setWebsites] = useState<Array<mongodb.Credentials>>()
    const [selectedWebsite, setSelectedWebsite] = useState(-1)
    const [reload, setReload] = useState("")
    const navigate = useNavigate();

    const onItemClick = (id: number) => {
        setSelectedWebsite(id)
    };

    async function getPasswords () {
        let res = await GetPasswordForUser(name)
        setWebsites(res)
    }

    function fetchNewPassword(update: string) {
        setReload(reload.concat(update))
    }

    async function pswToClipboard() {
        let resp;
        if (websites) {
            resp = await DecryptPsw(mainPassword, websites[selectedWebsite].Password)
            if (resp !== "") {
                await navigator.clipboard.writeText(resp)
                toast.success("Successfully save in clipboard")
            } else {
                toast.error("Unknown error")
            }
        }
    }

    useEffect(() => {
        getPasswords();
    }, [reload])

    return (
        <>
            <NavBarHome username={name} password={mainPassword}  onUpdatePassword={fetchNewPassword}/>
                <Row>
                    <Col sm={3} style={{backgroundColor: "rgb(29, 37, 53)", height: "90vh", width:"10%"}}>
                        <Menu mainPassword={mainPassword} name={name} />
                    </Col>
                    <Col md={3}>
                        <h3>Website registered</h3>
                        <ListView items={websites}  onItemClick={onItemClick}/>
                    </Col>
                    <Col style={{backgroundColor: "rgb(248, 249, 250)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        {selectedWebsite !== -1 && websites !== undefined ? (
                            <div>
                                <h4>{websites[selectedWebsite].Website}</h4>
                                <p>Login {websites[selectedWebsite].Login} </p>
                                <p> Encoded password {websites[selectedWebsite].Password}</p>
                                <Button variant="primary" onClick={pswToClipboard}>
                                    Copy decrypted password to clipboard
                                </Button>
                                <p> Notes: {websites[selectedWebsite].Additional}</p>
                            </div>
                        ) : (
                            <div style={{}}>
                                <Image src={PassManComics} width={"500px"}></Image>
                            </div>
                        )}
                    </Col>
                </Row>
        </>
    );
};

export default Home;
