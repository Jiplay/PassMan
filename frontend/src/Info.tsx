import React from 'react';
import {useLocation} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-toastify/dist/ReactToastify.css';
import NavBarHome from "./components/NavBar";

import Menu from "./components/Menu";
import InfoCarousel from "./components/PDFViewer";

interface LocationState {
    mainPassword: string;
    name: string
}

const Info: React.FC = () => {
    const location = useLocation();
    const { mainPassword, name } = location.state as LocationState|| {};

    function fetchNewPassword(update: string) {
        console.log("unused")
    }

    return (

        <div style={{overflow: "hidden", backgroundColor: 'rgb(248, 249, 250)', minHeight: '100vh'}}>
            <NavBarHome username={name} password={mainPassword} onUpdatePassword={fetchNewPassword}/>

            <Row>
                <Col sm={3} style={{backgroundColor: "rgb(29, 37, 53)", height: "100vh", width:"10%"}}>
                    <Menu mainPassword={mainPassword} name={name}/>
                </Col>
                <Col style={{
                    backgroundColor: "rgb(248, 249, 250)",
                    display: "flex",
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom:"5%"
                }}>
                    <InfoCarousel/>
                </Col>
            </Row>
        </div>
    );
};

export default Info;
