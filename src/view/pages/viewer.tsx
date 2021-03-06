import React from 'react';
import { Editor } from '../components/editor';
import { Menu } from '../components/menu';
import { Row } from '../components/elements/row';
import { Split } from '../components/elements/split';

export const Viewer = () => {
    return <Row>
        <Split>
            <Menu />
            <Editor />
        </Split>
    </Row>
}
