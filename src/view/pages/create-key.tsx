import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import { addKey } from '../actions/viewerAction';
import { Button } from '../components/elements/button';
import { Input } from '../components/elements/input';
import { Row } from '../components/elements/row';
import { Select } from '../components/elements/select';
import { colors } from '../constants/colors';
import { REDIS_TYPES } from '../constants/redis-types';
import { locale } from '../locale';

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
                {Object.keys(REDIS_TYPES).map((key) => {
                    return <option key={key}>{REDIS_TYPES[key as keyof typeof REDIS_TYPES]}</option>;
                })}
            </Select>
        </Row>
        <div className={styles.buttonsGroup}>
            <Button onClick={() => onSave()}>{locale().common.save}</Button>
            <Button onClick={() => location.hash = '/'}>{locale().common.cancel}</Button>
        </div>
    </div>
}
