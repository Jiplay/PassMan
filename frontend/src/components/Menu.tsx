import React from "react";
import {BsFileLock2Fill, BsFillInfoCircleFill, BsFillShieldLockFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";


type MenuProps = {
    mainPassword: string;
    name: string
}

const Menu: React.FC<MenuProps> = ({ mainPassword, name}) => {
    const navigate = useNavigate();

    function disconnect() {
        localStorage.removeItem("ID");
        navigate('/')
    }
    return (
        <>
            <div onClick={() => {
                navigate('/home', {state: {mainPassword: mainPassword, name: name}});
            }}>
                <BsFileLock2Fill style={{fontSize: "50px", color: "white", marginTop: "25px"}}/>
            </div>
            <div onClick={() => {
                navigate('/generator', {state: {mainPassword: mainPassword, name: name}});
            }}>
                <BsFillShieldLockFill style={{fontSize: "50px", color: "white", marginTop: "50px"}}/>
            </div>
            <div onClick={() => {
                navigate('/info', {state: {mainPassword: mainPassword, name: name}});
            }}>
                <BsFillInfoCircleFill style={{fontSize: "50px", color: "white", marginTop: "50px"}}/>`
            </div>
            <div style={{ fontSize: "50px", color: "white", marginTop: "250px", marginLeft: "10%"}}>
                <Button onClick={disconnect}
                        variant="danger" style={{width: "100%"}}>Logout</Button>
            </div>
        </>
    );
};

export default Menu;