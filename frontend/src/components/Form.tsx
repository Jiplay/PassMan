
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

type LoginInputProps = {
    title: string;
    onUpdateInput: (newInput: string) => void;
};

function FormInput({ onUpdateInput, title }: LoginInputProps) {
    const [input, setInput] = useState('');

    const handlePasswordChange = (e: { target: { value: any; }; }) => {
        const newInput = e.target.value;
        setInput(newInput);
        onUpdateInput(newInput);
    };

    return (
        <>
            <Form.Label style={{ color: 'white' }} htmlFor="input">{title}</Form.Label>
            <Form.Control
                value={input}
                onChange={handlePasswordChange}
            />
        </>
    );
}

export default FormInput;