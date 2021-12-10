import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import SplitPane from 'react-split-pane';
import { toggleCursorApp, toggleSelectionApp } from '../../app';
import { colors } from '../../constants/colors';

interface Props {
    children: ReactElement[];
    onChange?: (index: number, px: number) => void;
}

const useStyles = createUseStyles({
    separator: {
        minWidth: '1px',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: colors.second,
        '&:hover': {
            outline: `2px solid ${colors.second}`,
        },
        '&:before': {
            cursor: 'col-resize',
            position: 'absolute',
            content: '""',
            height: '100%',
            display: 'block',
            width: '9px',
            zIndex: '2',
        },
    },
});

export const Split = (props: Props) => {
    const styles = useStyles();
    return <SplitPane split="vertical" resizerClassName={styles.separator} size={300}>
        {props.children}
    </SplitPane>
}