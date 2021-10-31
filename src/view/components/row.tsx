import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
});

interface Props {
    children: any
}

export const Row = ({ children }: Props) => {
    const styles = useStyles();
    return <div className={styles.row}>
        {children}
    </div>
}
