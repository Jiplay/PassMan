
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import {FloatingLabel} from "react-bootstrap";

type PasswordInputProps = {
    onUpdatePassword: (newPassword: string) => void;
};

function PasswordInput({ onUpdatePassword }: PasswordInputProps) {
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
                label="Password"
                className="mb-3"
            >
            <Form.Control
                type="password"
                id="inputPassword5"
                placeholder="Password"
                aria-describedby="passwordHelpBlock"
                value={password}
                onChange={handlePasswordChange}
            />
            </FloatingLabel>
        </>
    );
}

export default PasswordInput;