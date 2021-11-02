import React, { useEffect, useState } from 'react';

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

export const notifyCreate = () => {
    let singleNotifies: Notify[] = [];
    let singleSetNotifies: Function = () => {};

    const NotifyContainer = () => {
        const [notifies, setNotifies] = useState<Notify[]>(singleNotifies);
        singleNotifies = notifies;
        singleSetNotifies = setNotifies;

        return <div>
            {notifies.filter(s => !s.toDelete).map((not) => {
                return <div key={`${not.timestamp}${not.timestamp}${not.text}`}>
                    {not.title}
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
