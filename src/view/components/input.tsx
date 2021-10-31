import React from 'react';

interface IProps {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
}

export const Input = ({ onChange, value }: IProps) => {
    return <div>
        <input onChange={onChange} value={value}></input>
    </div>;
}