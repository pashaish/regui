import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants/colors';

export interface Notify {
    text: string;
    title: string;
    timestamp: number;
    time: number;
    toDelete: boolean;
}

export interface NotifyParams {
    title?: string;
    text?: string;
    time?: number;
}

const useStyles = createUseStyles({
    title: {
        margin: 'auto',
        width: '100%',
        textAlign: 'center',
    },
    root: {
        position: 'absolute',
        right: '5px',
        bottom: '5px',
        zIndex: '3',
    },
    item: {
        width: '250px',
        minHeight: '30px',
        backgroundColor: colors.second,
        userSelect: 'none',
        cursor: 'pointer',
        padding: '5px',
        color: colors.font,
        borderRadius: '5px',
        boxShadow: `0px 0px 12px -6px ${colors.separator}`
    },
});

export const notifyCreate = () => {
    let singleNotifies: Notify[] = [];
    let singleSetNotifies: Function = () => {};

    const NotifyContainer = () => {
        const styles = useStyles();
        const [notifies, setNotifies] = useState<Notify[]>(singleNotifies);
        singleNotifies = notifies;
        singleSetNotifies = setNotifies;

        return <div className={styles.root}>
            {notifies.filter(s => !s.toDelete).map((not) => {
                return <div className={styles.item} key={`${not.timestamp}${not.timestamp}${not.text}`} onClick={() => not.toDelete = true}>
                    <div className={styles.title}>{not.title}</div>
                    {not.text}
                </div>
            })}
        </div>;
    }

    setInterval(() => {
        singleSetNotifies(
            singleNotifies.filter((not) => (new Date().getTime() - not.timestamp) < not.time)
        );
        singleNotifies
    }, 1000 / 45);

    return {
        NotifyContainer,
        notify: (params: NotifyParams) => {
            if ((singleNotifies[singleNotifies.length - 1]?.text || '') === (params.text || '')) {
                if ((singleNotifies[singleNotifies.length - 1]?.title || '') === (params.title || '')) {
                    singleNotifies.pop();
                }
            }
            singleNotifies.push({
                text: params.text || '',
                title: params.title || '',
                timestamp: new Date().getTime(),
                time: params.time || 2500,
                toDelete: false,
            });
            singleSetNotifies([...singleNotifies]);
        }
    }
}
