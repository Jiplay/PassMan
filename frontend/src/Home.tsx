import React from 'react';
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Image} from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import NavBarHome from "./components/NavBar";
import { BsFileLock2Fill } from "react-icons/bs";
import PassManComics from "./assets/images/PassManComics.png";

interface LocationState {
    mainPassword: string;
    name: string
}

const Home: React.FC = () => {
    const location = useLocation();
    const { mainPassword, name } = location.state as LocationState|| {};

    return (
        <>
            <NavBarHome username={name}/>
                <Row>
                    <Col sm={3} style={{backgroundColor: "rgb(29, 37, 53)", height: "100vh", width:"10%"}}>
                        <BsFileLock2Fill style={{fontSize: "50px", color: "white", marginTop: "25px"}} />
                    </Col>
                    <Col md={3}>
                        <p>Website registered</p>
                    </Col>
                    <Col style={{backgroundColor: "rgb(248, 249, 250)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Image src={PassManComics} width={"300px"}></Image>
                    </Col>
                </Row>
        </>
    );
};

export default Home;
