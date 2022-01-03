import { getSettings } from '../../storage/settings';
import { eng } from './eng';
import { rus } from './rus';

export interface Locale {
    common: {
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
    viewer: {
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