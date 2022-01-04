import React from 'react';
import { FaCog } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';
import { useHistory, useLocation } from 'react-router';
import { getActiveConnection } from '../../storage/connections';
import { colors, paddings } from '../constants/colors';
import { locale } from '../locale';
import { Spacer } from './spacer';

const useStyles = createUseStyles({
    menu: {
        padding: '2px',
        paddingRight: '5px',
        paddingLeft: '0px',
        userSelect: 'none',
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
    const conn = getActiveConnection();
    const goSettings = () => {
        history.push({
            pathname: '/settings'
        });
    }

    return <div className={styles.menu}>
        {location.pathname !== '/settings'
            ? <div className={styles.settings} onClick={goSettings}><FaCog /></div>
            : <></>
        }
        <Spacer />
        {conn
            ? <div>{locale().appBar.connected_to} {conn.name}</div>
            : <></>
        }
        
    </div>
};
