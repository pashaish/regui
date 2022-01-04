import React, { useEffect } from 'react';
import ReactAce from 'react-ace/lib/ace';
import { createUseStyles } from 'react-jss';

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import { locale } from '../locale';

interface Props {
    value?: string;
    onChange?: (str: string) => void;
    readonly?: boolean;
}

const useStyles = createUseStyles({
    ace: {
        backgroundColor: 'transparent',
    },
});


export const EditorArea = (props: Props) => {
    const styles = useStyles();

    let value = props.value;
    // useEffect(() => {

    // });
    // try {
    //     value = JSON.stringify(JSON.parse(value || ''), null, 2)
    // } catch (error) {
    //     //
    // }

    return <ReactAce
        placeholder={locale().common.value}
        readOnly={props.readonly}
        height="96.9%"
        width="100%"
        wrapEnabled={true}
        showGutter={true}
        mode="json"
        theme="monokai"
        value={value}
        onChange={(e) => {
            if (props.onChange) {
                let val = e;
                // try {
                //     val = JSON.stringify(JSON.parse(val || ''), null, 2);
                // } catch (error) {
                //     //
                // }

                props.onChange(val);
            }
        }}
        className={styles.ace}
    />
}