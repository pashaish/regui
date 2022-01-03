import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    spacer: {
        margin: 'auto',
    }
});

export const Spacer = () => {
    const styles = useStyles();
    return <div className={styles.spacer}></div>
}