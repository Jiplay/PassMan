
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import {FloatingLabel} from "react-bootstrap";

type PasswordInputProps = {
    placeholder: string;
    onUpdatePassword: (newPassword: string) => void;
};

function PasswordInput({ onUpdatePassword, placeholder }: PasswordInputProps) {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e: { target: { value: any; }; }) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        onUpdatePassword(newPassword);
    };

    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label={placeholder}
                className="mb-3"
            >
            <Form.Control
                type="password"
                id="inputPassword5"
                placeholder={placeholder}
                aria-describedby="passwordHelpBlock"
                value={password}
                onChange={handlePasswordChange}
            />
            </FloatingLabel>
        </>
    );
}

export default PasswordInput;