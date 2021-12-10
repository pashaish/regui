import React from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/colors';
import { ContextMenu as DefaultContextMenu } from 'react-contextmenu';

interface Props {
    children?: any;
    id: string;
}

const useStyles = createUseStyles({
    menu: {
        display: 'flex',
        userSelect: 'none',
        cursor: 'pointer',
        backgroundColor: colors.first,
        padding: '5px',
        border: `1px solid ${colors.second}`,
        zIndex: 999,
        '&:hover': {
            backgroundColor: colors.second,
        },
    },
});

export const ContextMenu = (props: Props) => {
    const styles = useStyles();
    
    return <DefaultContextMenu className={styles.menu} id={props.id}>{props.children}</DefaultContextMenu>
}