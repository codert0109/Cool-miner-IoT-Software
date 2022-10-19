import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from '../Container/Box';
import WhiteLabel from '../WhiteLabel';
import { createStyles, Grid, Button, MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import { useStore } from '../../store/index';
import Swal from 'sweetalert2';
import { formatDecimalWeb3 } from '@/utils/index';

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
    },
    inputtext: {
        backgroundColor: 'white',
        border: 'none',
        outline: 'none',
        width: '100%',
        height: '100%',
        fontFamily: 'Proxima-Nova-Bold!important'
    },
}));

export default observer((props: Props) => {
    const { god, token } = useStore();
    const { classes } = useStyles();
    const router = useRouter()

    const refresh = async () => {
        token.refresh();
    };

    useEffect(() => {
        refresh();
    }, []);

    const onStakeTokens = () => {
        console.log('working button');
        router.push('/staking');
    };

    const [transfer_address, setTransferAddress] = useState('');
    const [transfer_amount, setTransferAmount] = useState('');

    const onInputAmount = (e) => {
        setTransferAmount(e.target.value);
    };

    const onInputAddress = (e) => {
        setTransferAddress(e.target.value);
    };

    const onTransferToken = () => {
        token.transfer(transfer_address, transfer_amount)
            .then(async (tx) => {
                const receipt = await tx;
                await receipt.wait();
                Swal.fire(
                    'Success',
                    `<p>Token transfered successfully!</p>`,
                    'success'
                )
            })
            .catch((err) => {
                Swal.fire(
                    'Error',
                    `<p>Errors occured while transfering</p>`,
                    'error'
                )
            });
    };

    return (
        <Box label="Wallet Balance">
            <Grid style={{ width: '100%' }}>
                <Grid.Col sm={12} md={6} className={classes.padding0}>
                    <WhiteLabel label={formatDecimalWeb3(BigInt(token.balance))} />
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
                            Stake ELUM
                        </Button>
                    </MantineProvider>
                </Grid.Col>
            </Grid>
            {/* <Grid style={{ width: '100%' }} className={classes.secondMargin}>
                <Grid.Col sm={6} md={3} className={classes.padding0}>
                    <WhiteLabel label={
                        <input
                            type="text"
                            placeholder='address 0x...'
                            value={transfer_address}
                            className={classes.inputtext}
                            onChange={onInputAddress}></input>
                    } />
                </Grid.Col>
                <Grid.Col sm={6} md={3} className={classes.padding0} style={{paddingLeft : 2}}>
                    <WhiteLabel label={
                        <input
                            type="text"
                            placeholder='amount'
                            value={transfer_amount}
                            className={classes.inputtext}
                            onChange={onInputAmount}></input>
                    } />
                </Grid.Col>
                <Grid.Col sm={12} md={6} className={classes.padding0}>
                    <Button 
                        size="xs" 
                        className={classes.button} 
                        color="orange"
                        onClick={() => onTransferToken()}>Transfer Your Tokens</Button>
                </Grid.Col>
            </Grid> */}
        </Box>
    );
});

interface Props { }