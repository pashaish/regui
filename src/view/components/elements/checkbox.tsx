import React from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/colors';

const useStyles = createUseStyles({
    wrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    outer: {
        cursor: 'pointer',
        borderRadius: '3px',
        width: '20px',
        height: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.font,
    },
    inner: {
        borderRadius: '3px',
        width: '12px',
        height: '12px',
        backgroundColor: colors.second,
    }
});

interface IProps {
    isChecked?: boolean;
    onChange?: (val: boolean) => void;
}

export const CheckBox = (props: IProps) => {
    const styles = useStyles();

    return <div className={styles.wrap}>
        <div className={styles.outer} onClick={(e) => props.onChange?.(!props.isChecked)}>
            {props.isChecked
                ? <div className={styles.inner}></div>
                : <></>}
        </div>
    </div>
}