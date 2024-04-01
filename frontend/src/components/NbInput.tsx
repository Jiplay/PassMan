import React, { ChangeEvent } from 'react';

interface NbInputProps {
    value: number;
    onChange: (value: number) => void;
}

const NbInput: React.FC<NbInputProps> = ({ value, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        onChange(newValue);
    };

    return (
        <input
            type="number"
            value={value}
            onChange={handleChange}
        />
    );
};

export default NbInput;
