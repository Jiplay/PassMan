
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import {FloatingLabel} from "react-bootstrap";

type LoginInputProps = {
    title: string;
    onUpdateInput: (newInput: string) => void;
    placeHolder: string;
};

function FormInput({ onUpdateInput, title, placeHolder }: LoginInputProps) {
    const [input, setInput] = useState('');

    const handleInputChange = (e: { target: { value: any; }; }) => {
        const newInput = e.target.value;
        setInput(newInput);
        onUpdateInput(newInput);
    };

    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label={placeHolder}
                className="mb-3"
            >
                <Form.Control
                    id="input"
                    value={input}
                    onChange={handleInputChange}
                    placeholder={placeHolder}
                />
            </FloatingLabel>
        </>
    );
}

export default FormInput;