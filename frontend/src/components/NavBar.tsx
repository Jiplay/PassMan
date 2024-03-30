import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Badge} from "react-bootstrap";
import AddPasswordModal from "./AddPasswordModal";

type NavBarHomeProps = {
    username: string;
}

function NavBarHome( { username }: NavBarHomeProps) {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>PassMan <Badge bg="danger">WIP</Badge></Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <div style={{marginRight: "20px"}}>
                        <AddPasswordModal  titleButton={"Add a Password"} titleModal={"Password Settings"} userPassword={"password"} username={username}/>
                    </div>
                    <Navbar.Text>
                        Signed in as: {username}
                        {/*Signed in as: <a href="#login">username</a>*/}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarHome;