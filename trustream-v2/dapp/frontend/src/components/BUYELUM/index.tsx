import React, { useState } from 'react';
import { createStyles, Button, Progress } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { BorderStyle } from 'tabler-icons-react';
import WhiteLabel from '../WhiteLabel';
import classjoin from 'classnames';
import Box from '../Container/Box';

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: '#0887BF',
        border: '0px',
        borderRadius: '6px',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        fontWeight: 'bold',
        position: 'relative',
        height: '42px'
    },
    body: {
        backgroundColor: 'rgb(219, 219, 219)',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: 'rgb(100, 117, 124)',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        padding: '10px',
        borderRadius: '20px',
    },
    secondMargin: {
        marginTop: '10px'
    },
    box: {
        minWidth: '190px'
    },
    button: {
        position: 'relative',
        transition: 'background-color 150ms ease',
        height : '28px',
        minWidth : '100px',
        maxWidth : '100%'
        // backgroundColor: '#0887BF',
    },

    progress: {
        position: 'absolute',
        bottom: -1,
        right: -1,
        left: -1,
        top: -1,
        height: 'auto',
        backgroundColor: 'transparent',
        zIndex: 0,
    },

    label: {
        position: 'relative',
        zIndex: 1,
    },
}));

export default function ({ label }) {
    const { classes, theme } = useStyles();
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const interval = useInterval(
        () =>
            setProgress((current) => {
                if (current < 100) {
                    return current + 1;
                }

                interval.stop();
                setLoaded(true);
                return 0;
            }),
        20
    );

    return (
        <Box label={label}>
            <WhiteLabel label="Desired Amount" className="" />
            <WhiteLabel label="USD 12.3456789" className={classes.secondMargin} />
            <Button
                className={classjoin(classes.button, classes.secondMargin)}
                onClick={() => (loaded ? setLoaded(false) : !interval.active && interval.start())}
                color={loaded ? 'teal' : 'yellow'}
            >
                <div className={classes.label}>
                    {progress !== 0 ? 'WAITING' : loaded ? 'SUCCESS' : 'BUY'}
                </div>
                {progress !== 0 && (
                    <Progress
                        value={progress}
                        className={classes.progress}
                        color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
                        radius="sm"
                    />
                )}
            </Button>
        </Box>
    );
}