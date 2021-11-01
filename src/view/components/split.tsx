import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../constants/colors';

interface Props {
    children: ReactElement[];
}

const useStyles = createUseStyles({
    separator: {
        width: '3px',
        backgroundColor: colors.separator,
        cursor: 'col-resize',
        // backgroundColor: colors.separator,
        height: '100%',
    },
    pane: {

    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
});

export const Split = (props: Props) => {
    const styles = useStyles();
    
    return <div className={styles.wrapper}>
        {props.children.map((ch, index) => {
            return <>
            <div
                className={styles.pane}
            >
                {ch}
            </div>
                {index !== props.children.length - 1
                    ? <div
                        className={styles.separator}
                        onMouseDown={(e) => {
                            let screenX = e.clientX;
                            const block = (e.target as HTMLDivElement).previousElementSibling as HTMLDivElement;

                            console.log('click')
                            const initialWidth = block.offsetWidth;

                            const onMove = (e: MouseEvent) => {
                                const offset = e.clientX - screenX;
                                block.style.width = `${initialWidth + offset}px`;
                            };

                            document.addEventListener('mouseup', () => {
                                document.removeEventListener('mousemove', onMove)
                            }, {
                                once: true,
                            });
                            document.addEventListener('mousemove', onMove);
                        }}
                    />
                    : ''
                }
            </>
        })}
    </div>
}