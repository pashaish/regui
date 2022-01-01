import React, { useEffect } from 'react';
import { Row } from '../components/elements/row';
import { Button } from '../components/elements/button';
import { getConnections } from '../../storage/connections';

export const Connections = () => {
    return <div>
        <Button onClick={() => {
            location.hash = '/connection-create';
        }}>add</Button>
        <Row>
            {getConnections().map((conn: any) => {
                return <div>{conn.host}</div>;
            })}
        </Row>
    </div>
}
