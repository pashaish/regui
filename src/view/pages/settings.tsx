import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../components/elements/button';
import { Row } from '../components/elements/row';
import { Select } from '../components/elements/select';
import { locale } from '../locale';
import { createUseStyles } from 'react-jss';
import { Spacer } from '../components/spacer';
import { paddings } from '../constants/colors';
import { getSettings, setSettings } from '../../storage/settings';

const useStyles = createUseStyles({
    wrapper: {
        minWidth: '600px',
        width: '50%',
        margin: 'auto',
        '& > *': {
            margin: paddings.main,
        },
    }
});

export const Settings = () => {
    const styles = useStyles();
    const history = useHistory();
    const [lang, setLang] = useState(getSettings().locale);

    return <div className={styles.wrapper}>
        <Row>
            <div>{locale().settings.select_lang}</div>
            <Spacer />
            <Select value={lang} onChange={(val) => { setSettings('locale', val); setLang(getSettings().locale); }}>
                {[['rus', 'Русский'], ['eng', 'English']].map(([key, preview]) => {
                    return <option key={key} value={key}>{preview}</option>
                })}
            </Select>
        </Row>
        <Button onClick={() => {
            history.goBack();
        }}>{locale().common.back}</Button>
    </div>
}