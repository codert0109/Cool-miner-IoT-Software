import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from '../Container/Box';
import WhiteLabel from '../WhiteLabel';
import { createStyles, Grid, Button, MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import { useStore } from '../../store/index';

const BREAKPOINT = '@media (max-width: 992px)';

const useStyles = createStyles((theme) => ({
    secondMargin: {
        marginTop: '0px'
    },
    button: {
        marginLeft: '5%',
        width: '95%',
        [BREAKPOINT]: {
            marginLeft: 0,
            width: '100%'
        }
    },
    firstLabel: {
        paddingBottom: 0
    },
    padding0: {
        paddingLeft: 0,
        paddingRight: 0
    }
}));

export default observer((props: Props) => {
    const { god, token } = useStore();
    const { classes } = useStyles();
    const router = useRouter()
    const [balance, setBalance] = useState('0');

    const refresh = async () => {
        let value : string;
        value = await token.getBalance();
        setBalance(value);
    };

    useEffect(() => {
        refresh();
    }, []);

    const onStakeTokens = () => {
        console.log('working button');
        router.push('/staking');
    };

    return (
        <Box label="Wallet Balance">
            <Grid style={{ width: '100%' }}>
                <Grid.Col sm={12} md={6} className={classes.padding0}>
                    <WhiteLabel label={balance} />
                </Grid.Col>
                <Grid.Col sm={12} md={6} className={classes.padding0}>
                    <MantineProvider
                        theme={{
                            colors: {
                                'brightorange': ['#FF8800', '#FF8800', '#FF8800', '#FF8800', '#FF8800', '#FF8800', '#FF8800']
                            },
                        }}
                    >
                        <Button 
                            size="xs" 
                            onClick={() => onStakeTokens()}
                            className={classes.button} 
                            color="brightorange">
                            Stake Your Tokens
                        </Button>
                    </MantineProvider>
                </Grid.Col>
            </Grid>
            <Grid style={{ width: '100%' }} className={classes.secondMargin}>
                <Grid.Col sm={12} md={6} className={classes.padding0}>
                    <WhiteLabel label=".............." />
                </Grid.Col>
                <Grid.Col sm={12} md={6} className={classes.padding0}>
                    <Button size="xs" className={classes.button} color="orange">Transfer Your Tokens</Button>
                </Grid.Col>
            </Grid>
        </Box>
    );
});

interface Props { }