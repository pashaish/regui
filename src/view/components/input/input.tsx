import React from 'react';

export const Input = ({ onChange, value}) => {
    return <div>
        <input onChange={onChange} value={value}></input>
    </div>;
}