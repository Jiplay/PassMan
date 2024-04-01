import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Image} from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import NavBarHome from "./components/NavBar";
import { BsFileLock2Fill } from "react-icons/bs";
import PassManComics from "./assets/images/PassManComics.png";
import ListView from "./components/ListView";
import {GetPasswordForUser} from "../wailsjs/go/main/App";

// @ts-ignore  Strange but necessary, works in prod mode
import {mongodb} from '../models';

interface LocationState {
    mainPassword: string;
    name: string
}

interface ListItem {
    Website: string;
    Login: string;
    Password: string;
    Additional: string;
}

const Home: React.FC = () => {
    const location = useLocation();
    const { mainPassword, name } = location.state as LocationState|| {};
    const [websites, setWebsites] = useState<Array<mongodb.Credentials>>()
    const [selectedWebsite, setSelectedWebsite] = useState(-1)

    const onItemClick = (id: number) => {
        console.log('Item clicked:', id);
        setSelectedWebsite(id)
        // Faites quelque chose avec l'ID de l'élément cliqué, par exemple, naviguer vers une autre page, afficher des détails, etc.
    };

    async function getPasswords () {
        let res = await GetPasswordForUser(name)

        setWebsites(res)
    }

    useEffect(() => {
        getPasswords();
    }, [])

    return (
        <>
            <NavBarHome username={name} password={mainPassword} />
                <Row>
                    <Col sm={3} style={{backgroundColor: "rgb(29, 37, 53)", height: "100vh", width:"10%"}}>
                        <BsFileLock2Fill style={{fontSize: "50px", color: "white", marginTop: "25px"}} />
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
                                <p> Password {websites[selectedWebsite].Password}</p>
                                <p> Notes: {websites[selectedWebsite].Additional}</p>
                            </div>
                        ) : (
                            <Image src={PassManComics} width={"300px"}></Image>
                        )}
                    </Col>
                </Row>
        </>
    );
};

export default Home;
