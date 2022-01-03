import React, { useEffect } from 'react';
import { Button } from '../components/elements/button';
import { LocalStorage } from 'node-localstorage';
import { Input } from '../components/elements/input';
import { createUseStyles } from 'react-jss';
import { Row } from '../components/elements/row';
import { addConnection, Connection, editConnection } from '../../storage/connections';
import { useLocation } from 'react-router';
import Redis from 'ioredis';
import { notify } from '../app';
import { locale } from '../locale';

const useStyles = createUseStyles({
    list: {
        width: '600px',
        margin: 'auto',
        marginTop: '100px',
        '& > *': {
            marginTop: '10px',
        }
    },
    buttons: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            width: '100%',
            margin: '5px',
        },
    },
});

interface Props {
    isCreate: boolean;
}

export const ConnectionEdit = (props: Props) => {
    const styles = useStyles();
    const { state } = useLocation<{ index: number, conn: Connection }>();

    const { conn, index } = state || {};
    const [name, setname] = React.useState(conn?.name || '');
    const [host, sethost] = React.useState(conn?.host || '');
    const [port, setport] = React.useState((conn?.port || '').toString());
    const [username, setusername] = React.useState(conn?.username || '');
    const [password, setpassword] = React.useState(conn?.password || '');

    function onEdit() {
        if (props.isCreate) {
            addConnection({
                host,
                name,
                password,
                port: Number(port),
                username,
            });
        } else {
            editConnection(index, {
                name,
                host,
                port: Number(port),
                username,
                password,
            });
        }

        location.hash = '/connections'
    }

    async function onTest() {
        const client = new Redis(Number(port), host, {
            password,
            username,
            retryStrategy: () => null,
        });

        const mess = await client.ping();
        notify({
            title: locale().common.successful_connection,
        });

        await client.disconnect();
    }

    return <div className={styles.list}>
        <Input placeholder='name' value={name} onChange={(e) => setname(e.target.value)} />
        <Input placeholder='host' value={host} onChange={(e) => sethost(e.target.value)} />
        <Input type="number" placeholder='port' value={port} onChange={(e) => setport(e.target.value)} />
        <Input placeholder='username' value={username} onChange={(e) => setusername(e.target.value)} />
        <Input placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)} />
        <div className={styles.buttons}>
            <Button onClick={onTest}>{locale().common.test}</Button>
            <Button onClick={onEdit}>{props.isCreate ? locale().common.create : locale().common.save}</Button>
            <Button onClick={() => location.hash = '/connections'}>{locale().common.cancel}</Button>
        </div>
    </div>
}
