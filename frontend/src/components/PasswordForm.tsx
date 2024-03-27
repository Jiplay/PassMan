
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

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
            <Form.Label style={{ color: 'white' }} htmlFor="inputPassword">Password</Form.Label>
            <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                value={password}
                onChange={handlePasswordChange}
            />
            <Form.Text id="passwordHelpBlock" style={{ color: 'white' }}>
                Your password must be 13-20 characters long, contain letters and numbers,
                and at least 1 special characters,
                and must not contain spaces, or emoji.
            </Form.Text>
        </>
    );
}

export default PasswordInput;