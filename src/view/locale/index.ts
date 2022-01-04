import { getSettings } from '../../storage/settings';
import { eng } from './eng';
import { rus } from './rus';

export interface Locale {
    common: {
        name: string;
        host: string;
        port: string;
        username: string;
        password: string;
        back: string;
        refresh: string;
        add: string;
        test: string;
        cancel: string;
        save: string;
        saved: string;
        edit: string;
        rename: string;
        score: string;
        remove: string;
        disconnect: string;
        create: string;
        successful_connection: string;
    },
    settings: {
        select_lang: string;
    },
    appBar: {
        connected_to: string;
    },
}

export const locale = (): Locale => {
    const { locale } = getSettings();
    
    if (locale === 'eng') {
        return eng;
    }

    if (locale === 'rus') {
        return rus;
    }

    throw new Error('undefined locale');
}