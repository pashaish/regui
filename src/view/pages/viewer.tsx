import React from 'react';
import { Editor } from '../components/editor';
import { Menu } from '../components/menu';
import { Row } from '../components/row';
import { Split } from '../components/split';

export const Viewer = () => {
    return <Row>
        <Split>
            <Menu />
            <Editor />
        </Split>
    </Row>
}
