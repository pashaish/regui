import React from 'react';
import { FaCog } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';
import { useHistory, useLocation } from 'react-router';
import { colors, paddings } from '../constants/colors';

const useStyles = createUseStyles({
    menu: {
        borderTop: `1px solid ${colors.secondFont}`,
        backgroundColor: colors.first,
        width: '100%',
        position: 'absolute',
        bottom: '0',
        boxSizing: 'border-box',
        height: paddings.appbarHeight,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    settings: {
        padding: paddings.second,
        display: 'flex',
        userSelect: 'none',
        cursor: 'pointer',
        flexDirection: 'row',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: colors.second,
        }
    },
});

export const AppBar = () => {
    const history = useHistory();
    const location = useLocation();
    const styles = useStyles();

    return <div className={styles.menu}>
        {location.pathname !== '/settings'
            ?
            <div className={styles.settings} onClick={() => {
                history.push({
                    pathname: '/settings'
                });
            }}>
                <FaCog />
            </div>
            :
            <></>
        }
    </div>
};
