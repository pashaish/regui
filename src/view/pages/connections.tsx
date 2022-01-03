import React, { useEffect } from 'react';
import { Row } from '../components/elements/row';
import { Button } from '../components/elements/button';
import { Connection, getConnections, removeConnection, setActiveConnection } from '../../storage/connections';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants/colors';
import { ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { ContextMenu } from '../components/elements/context-menu';
import { useHistory, useLocation } from 'react-router';

const useStyles = createUseStyles({
    list: {
        margin: 'auto',
        width: '600px',
        '& > *': {
            margin: '5px',
        },
    },
    conn: {
        padding: '5px',
        cursor: 'pointer',
        userSelect: 'none',
        width: '100%',
        '&:hover': {
            backgroundColor: colors.first,
        },
    },
    connName: {

    },
    connHost: {
        fontSize: '12px',
        color: 'grey',
    }
});

function connect(conn: Connection) {
    setActiveConnection(conn);
    location.hash = '/'
}

export const Connections = () => {
    const styles = useStyles();
    const history = useHistory();
    const [connections, setConnections] = React.useState(getConnections());

    return <div className={styles.list}>
        <Button onClick={() => {
            location.hash = '/connection-create';
        }}>add</Button>
        <div>
            {connections.map((conn, index: number) => {
                return <div key={JSON.stringify(conn) + index} className={styles.conn}>
                    <ContextMenuTrigger id={`connection-context-${index}`}>
                        <div onClick={() => connect(conn)}>
                            <div className={styles.connName}>
                                {conn.name}
                            </div>
                            <div className={styles.connHost}>
                                {conn.host}:{conn.port}
                            </div>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenu id={`connection-context-${index}`}>
                        <MenuItem onClick={() => {
                            history.replace({
                                pathname: '/connection-edit',
                                state: {
                                    index,
                                    conn,
                                }
                            });
                        }}>edit</MenuItem>
                        <MenuItem onClick={() => {
                            removeConnection(index);
                            setConnections(getConnections());
                        }}>
                            remove
                        </MenuItem>
                    </ContextMenu>
                </div>
            })}
        </div>
    </div>
}
