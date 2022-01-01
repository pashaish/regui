import { LocalStorage } from "node-localstorage";

export interface Connection {
    username: string | null;
    password: string | null;
    host: string;
    name: string;
    port: number;
}

const ls = new LocalStorage('./storage/connections');

export function getConnections(): Connection[] {
    return JSON.parse(ls.getItem('connections') || '[]');
}

export function setConnections(connections: Connection[]) {
    ls.setItem('connections', JSON.stringify(connections));
}

export function addConnection(connection: Connection) {
    const conns = getConnections();
    conns.push(connection);
    setConnections(conns);
}

export function removeConnection(index: number) {
    const conns = getConnections();
    conns.splice(index, 1)

    setConnections(conns);
}