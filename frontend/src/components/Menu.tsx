import React from "react";
import {BsFileLock2Fill, BsFillInfoCircleFill, BsFillShieldLockFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";


type MenuProps = {
    mainPassword: string;
    name: string
}

const Menu: React.FC<MenuProps> = ({ mainPassword, name}) => {
    const navigate = useNavigate();

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
        </>
    );
};

export default Menu;