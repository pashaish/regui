import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '../components/elements/button';
import { locale } from '../locale';

export const Settings = () => {
    const history = useHistory();

    return <div>
        <Button onClick={() => {
            history.goBack();
        }}>{locale().common.cancel}</Button>
    </div>
}