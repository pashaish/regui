import React from 'react';
import { redisAPI } from '../common';
import { Menu } from '../components/menu';
import { isEqual } from 'lodash';

const formatSearch = (str: string) => {
    return `*${str.trim()}*` || "*";
}

export const Viewer = () => {
    const [keys, setKeys] = React.useState({});
    const [field, setField] = React.useState('');
    React.useEffect(() => {
        redisAPI.getKeys(formatSearch(field)).then((ks) => {
            setKeys(ks);
        });
    }, [field]);

    return <div>
        <Menu
            searchFieldOnChange={(val) => setField(val)}
            searchField={field}
            tree={keys}
        ></Menu>
    </div>
}
