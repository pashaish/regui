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
        flexDirection: 'column',
        userSelect: 'none',
        cursor: 'pointer',
        backgroundColor: colors.first,
        border: `1px solid ${colors.second}`,
        zIndex: 999,
        '& [role="menuitem"]': {
            padding: '2px',
        },
        '& [role="menuitem"]:hover': {
            backgroundColor: colors.second,
        },
    },
});

export const ContextMenu = (props: Props) => {
    const styles = useStyles();
    
    return <DefaultContextMenu className={styles.menu} id={props.id}>{props.children}</DefaultContextMenu>
}