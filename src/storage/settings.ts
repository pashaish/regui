import { LocalStorage } from "node-localstorage";
import { join, resolve } from 'path';

const ls = () => new LocalStorage(join((process.env.TMPDIR || process.env.TMP) as string, '/storage/settings'));

export function getSettings() {
    return {
        locale: ls().getItem('locale') || 'eng',
    };
}

type t_key = keyof ReturnType<typeof getSettings>;

export function setSettings(key: t_key, value: string) {
    ls().setItem(key, value);
}