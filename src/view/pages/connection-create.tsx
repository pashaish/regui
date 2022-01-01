import React, { useEffect } from 'react';
import { Button } from '../components/elements/button';
import { LocalStorage } from 'node-localstorage';
import { Input } from '../components/elements/input';
import { createUseStyles } from 'react-jss';
import { Row } from '../components/elements/row';
import { addConnection } from '../../storage/connections';

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


export const ConnectionCreate = () => {
    const styles = useStyles();
    const [name, setname] = React.useState('');
    const [host, sethost] = React.useState('');
    const [port, setport] = React.useState('');
    const [username, setusername] = React.useState('');
    const [password, setpassword] = React.useState('');

    function onAdd() {
        addConnection({
            host,
            name,
            password,
            port: Number(port),
            username,
        });

        location.hash = '/connections'
    }

    return <div className={styles.list}>
        <Input placeholder='name' value={name} onChange={(e) => setname(e.target.value)} />
        <Input placeholder='host' value={host} onChange={(e) => sethost(e.target.value)} />
        <Input placeholder='port' value={port} onChange={(e) => setport(e.target.value)} />
        <Input placeholder='username' value={username} onChange={(e) => setusername(e.target.value)} />
        <Input placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)} />
        <div className={styles.buttons}>
            <Button>test</Button>
            <Button onClick={onAdd}>add</Button>
            <Button>cancel</Button>
        </div>
    </div>
}
