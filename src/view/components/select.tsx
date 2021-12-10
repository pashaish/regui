import React from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants/colors';

interface Props {
    children?: any;
    onClick?: () => void;
    onChange?: (val: string) => void;
    value?: string;
    className?: string;
}

const useStyles = createUseStyles({
    select: {
        backgroundColor: colors.main,
        color: colors.font,
        border: `1px solid ${colors.second}`,
        borderRadius: '3px',
    },
});

export const Select = (props: Props) => {
    const styles = useStyles();
    
    return <select
        onClick={props.onClick}
        className={styles.select + (props.className ? ` ${props.className}` : '')}
        value={props.value}
        onChange={(e) => {
            if (props.onChange) {
                props.onChange(e.target.value)}
            }
        }
    >
        {props.children}
    </select>
}