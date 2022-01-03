import { LocalStorage } from "node-localstorage";

const ls = new LocalStorage('./storage/settings');

export function getSettings() {
    return {
        locale: ls.getItem('locale') || 'eng',
    };
}

type t_key = keyof ReturnType<typeof getSettings>;

export function setSettings(key: t_key, value: string) {
    ls.setItem(key, value);
}