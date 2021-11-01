import React from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants/colors';

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
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
    readonly?: boolean;
    placeholder?: string;
}

export const Input = (props: IProps) => {
    const styles = useStyles();

    return <div>
        <input
            readOnly={props.readonly}
            placeholder={props.placeholder}
            className={styles.input}
            onChange={props.onChange}
            value={props.value}
        ></input>
    </div>;
}