import React from 'react';
import { Editor } from '../components/editor';
import { Menu } from '../components/menu';
import { Row } from '../components/row';

export const Viewer = () => {
    return <Row>
        <Menu />
        <Editor />
    </Row>
}
