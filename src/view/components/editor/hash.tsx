import React from 'react';
import { useSelector } from '../../reducers';
import { Row } from '../row';
import { createUseStyles } from 'react-jss';
import { colors, paddings } from '../../constants/colors';
import { Split } from '../split';

const useStyles = createUseStyles({
    fieldsMenu: {
        // borderRight: `1px solid ${colors.separator}`,
        padding: '8px',
        minWidth: '32px',
        height: '100%',
        boxShadow: `4px 0px 5px -4px ${colors.separator}`,
    },
    wrapper: {
        height: '100%'
    },
});

export const HashEditor = () => {
    const keys = useSelector(store => store.editors.editorHashReducer.fields);
    const styles = useStyles();

    return <div className={styles.wrapper}>
        <Row>
            <Split>
                <div className={styles.fieldsMenu}>
                    {keys.map(key => {
                        return <div>
                            {key}
                        </div>
                    })}
                </div>
                <div>editor</div>
            </Split>
        </Row>
    </div>;
}