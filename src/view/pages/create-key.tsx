import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import { addKey } from '../actions/viewerAction';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Row } from '../components/row';
import { Select } from '../components/select';
import { colors } from '../constants/colors';

const useStyles = createUseStyles({
    wrap: {
        width: '500px',
        margin: '0 auto',
        marginTop: '100px',
    },derRadius: '3px',
    buttonsGroup: {
        marginTop: '5px',
        display: 'flex',
        '& > *': {
            width: '100%',
        }
    },
});


export const CreateKey = () => {
    const styles = useStyles();
    const [value, setValue] = useState('');
    const [type, setType] = useState('string');
    const dispatch = useDispatch();

    function onSave() {
        dispatch(addKey(value, type));
    }

    return <div className={styles.wrap}>
        <Row>
            <Input onChange={(str) => setValue(str.currentTarget.value)} placeholder="key" value={value} />
            <Select value={type} onChange={(opt) => setType(opt)}>
                <option>string</option>
                <option>list</option>
                <option>hash</option>
            </Select>
        </Row>
        <div className={styles.buttonsGroup}>
            <Button onClick={() => onSave()}>save</Button>
            <Button onClick={() => location.hash = '/'}>cancel</Button>
        </div>
    </div>
}
