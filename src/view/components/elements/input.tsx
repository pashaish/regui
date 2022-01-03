import React from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/colors';

const padding = 3;
const margin = 0;
const border = 1;

const useStyles = createUseStyles({
    input: {
        margin: `${0}px`,
        marginLeft: margin,
        marginRight: margin,
        '&:focus': {
            borderColor: colors.secondFont,
            outline: 0,
        },
        width: `calc(100% - ${(margin + padding + border) * 2}px)`,
        backgroundColor: colors.main,
        border: `${border}px solid ${colors.second}`,
        outlineColor: colors.first,
        borderRadius: '3px',
        padding: `${padding}px`,
        color: colors.font,
    }
});

interface IProps {
    type?: 'text' | 'number';
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.ChangeEventHandler<HTMLInputElement>;
    onInput?: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    value?: string;
    defaultValue?: string;
    className?: string;
    readonly?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
}

export const Input = (props: IProps) => {
    const styles = useStyles();
    const inputType = props.type || 'text';

    return <input
        autoFocus={props.autoFocus}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        onInput={props.onInput}
        readOnly={props.readonly}
        placeholder={props.placeholder}
        className={`${styles.input} ${props.className}`}
        onChange={(e) => {
            switch(inputType) {
                case 'number': {
                    const chars = e.target.value.split('').map(ch => ch === ',' ? '.' : ch);
                    e.target.value = chars.join('');
                    const isNumber = (char: string) => !isNaN(Number(char));
                    const isValidChar = (char: string, index: number) =>
                        (isNumber(char) ||
                        (index === 0 && char === '-') ||
                        (index !== 0 && char === '.')) &&
                        char !== ' ';
        
                    const isValidNumberChars = (chars: string[]) => chars
                        .every(isValidChar) || chars.length === 0
                    
                    if (!isValidNumberChars(chars)) {
                        return;
                    }                    
                }

                case 'text': {
                }
            }
            return props.onChange?.(e);
        }}
        defaultValue={props.defaultValue}
        value={props.value}
    ></input>
}