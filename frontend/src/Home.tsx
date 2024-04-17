import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button, Image} from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import NavBarHome from "./components/NavBar";
import PassManComics from "./assets/images/PassManComics.png";
import ListView from "./components/ListView";
import {DecryptPsw, DeletePassword, GetPasswordForUser} from "../wailsjs/go/main/App";

// @ts-ignore  Strange but necessary, works in prod mode
import {mongodb} from '../models';
import {toast} from "react-toastify"
import Menu from "./components/Menu";
import DangerModal from "./components/DangerModal";


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
    const [websiteToDelete, setWebsiteToDelete] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false)

    const onItemClick = (id: number) => {
        setSelectedWebsite(id)
    };

    const onDeleteClick = (website: string) => {
        setShowModal(true)
        setWebsiteToDelete(website)
    };

    const closeModal = () => {
        setShowModal(false)
    };

    const deleteWebsite = async () => {
        await DeletePassword(name, websiteToDelete)
        await getPasswords()
        setShowModal(false)
    }

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
        <div style={{overflow:"hidden", backgroundColor: 'rgb(248, 249, 250)', minHeight: '100vh'}}>
            <NavBarHome username={name} password={mainPassword}  onUpdatePassword={fetchNewPassword}/>
            <div style={{maxWidth: "100vw", maxHeight: "720px"}}>
                <Row>
                        <Col sm={3} style={{backgroundColor: "rgb(29, 37, 53)", height: "100vh", width:"10%"}}>
                            <Menu mainPassword={mainPassword} name={name} />
                        </Col>
                        <Col md={3} style={{}}>
                            <h3>Website registered</h3>
                            <ListView items={websites} onItemClick={onItemClick} onDeleteClick={onDeleteClick}/>
                        </Col>
                        <DangerModal website={websiteToDelete} show={showModal} onClose={closeModal} onDelete={deleteWebsite}></DangerModal>
                        <Col style={{backgroundColor: "rgb(248, 249, 250)", display: "flex", alignItems: "center", justifyContent: "center", minHeight:"100%"}}>
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
            </div>
        </div>
    );
};

export default Home;
