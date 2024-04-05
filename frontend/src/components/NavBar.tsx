import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Badge} from "react-bootstrap";
import AddPasswordModal from "./AddPasswordModal";

type NavBarHomeProps = {
    username: string;
    password: string;
    onUpdatePassword: (update: string) => void
}

function NavBarHome( { username, password, onUpdatePassword }: NavBarHomeProps) {
    return (
        <div style={{minWidth:"100%", overflow:"hidden"}}>
            <Navbar >
                <Container>
                    <Navbar.Brand>PassMan <Badge bg="danger">ALPHA</Badge></Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <div style={{marginRight: "20px"}}>
                            <AddPasswordModal  titleButton={"Add a Password"} titleModal={"Password Settings"} username={username} password={password} onUpdatePassword={onUpdatePassword}/>
                        </div>
                        <Navbar.Text>
                            Signed in as: {username}
                            {/*Signed in as: <a href="#login">username</a>*/}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    );
}

export default NavBarHome;