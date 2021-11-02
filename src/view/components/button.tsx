import React from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants/colors';

interface Props {
    children?: any;
    onClick?: () => void;
    className?: string;
}

const useStyles = createUseStyles({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '3px',
        border: `1px solid ${colors.second}`,
        '&:hover': {
            backgroundColor: colors.second,
        },
    },
});

export const Button = (props: Props) => {
    const styles = useStyles();
    
    return <div onClick={props.onClick} className={styles.button + (props.className ? ` ${props.className}` : '')}>
        {props.children}
    </div>
}