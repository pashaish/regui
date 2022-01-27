import { LocalStorage } from "node-localstorage";
import { join, resolve } from 'path';

export interface Connection {
    username: string | null;
    password: string | null;
    host: string;
    name: string;
    port: number;
}

const ls = () => new LocalStorage(join((process.env.TMPDIR || process.env.TMP) as string, '/storage/connections'));

export function setActiveConnection(conn: Connection) {
    ls().setItem('active', JSON.stringify(conn));
}

export function deleteActiveConnection() {
    ls().removeItem('active');
}

export function getActiveConnection(): Connection | null {
    const item = ls().getItem('active');
    if (!item) {
        return null;
    }

    return JSON.parse(item);
}

export function getConnections(): Connection[] {
    return JSON.parse(ls().getItem('connections') || '[]');
}

export function setConnections(connections: Connection[]) {
    ls().setItem('connections', JSON.stringify(connections));
}

export function addConnection(connection: Connection) {
    const conns = getConnections();
    conns.push(connection);
    setConnections(conns);
}

export function editConnection(id: number, connection: Connection) {
    const conns = getConnections();
    conns[id] = connection;
    setConnections(conns);
}

export function removeConnection(index: number) {
    const conns = getConnections();
    conns.splice(index, 1)

    setConnections(conns);
}