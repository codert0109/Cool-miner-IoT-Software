import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from '../Container/Box';
import WhiteLabel from '../WhiteLabel';
import { createStyles, Grid, Button, MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import { useStore } from '../../store/index';
import Swal from 'sweetalert2';
import { formatDecimalWeb3 } from '@/utils/index';
import join from "classnames";

const BREAKPOINT = '@media (max-width: 992px)';

const useStyles = createStyles((theme) => ({
    secondMargin: {
        marginTop: '0px'
    },
    w100: {
        width: '100%'
    },
    button: {
        marginLeft: '5%',
        width: '95%',
        height: '100%',
        [BREAKPOINT]: {
            marginLeft: 0,
            width: '100%'
        }
    },
    firstLabel: {
        paddingBottom: 0
    },
    padding0: {
        [BREAKPOINT]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    inputtext: {
        backgroundColor: 'white',
        border: 'none',
        outline: 'none',
        width: '100%',
        height: '100%',
        fontFamily: 'Proxima-Nova-Bold!important'
    },
    padding_left0: {
        paddingLeft: 0,
        [BREAKPOINT]: {
            paddingRight: 0
        }
    },

    padding_right0: {
        paddingRight: 0,
        [BREAKPOINT]: {
            paddingLeft: 0
        }
    },
    textcenter: {
        textAlign: 'center'
    }
}));

export default observer((props: Props) => {
    const { god, token, stake } = useStore();
    const { classes } = useStyles();
    const router = useRouter()

    const refresh = async () => {
        token.refresh();
        stake.refresh();
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
            <Grid className={join(classes.w100)}>
                <Grid.Col sm={12} md={3} className={classes.padding_left0}>
                    <Grid>
                        <Grid.Col sm={12}>
                            <WhiteLabel label="Available tokens" className={classes.textcenter} />
                        </Grid.Col>
                        <Grid.Col sm={12} style={{ paddingTop: 0 }}>
                            <WhiteLabel label={formatDecimalWeb3(BigInt(token.balance))} className={classes.textcenter} />
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col sm={12} md={3} className={classes.padding0}>
                    <Grid>
                        <Grid.Col sm={12}>
                            <WhiteLabel label="Staked tokens" className={classes.textcenter} />
                        </Grid.Col>
                        <Grid.Col sm={12} style={{ paddingTop: 0 }}>
                            <WhiteLabel label={formatDecimalWeb3(stake.stakedInfo.amount)} className={classes.textcenter} />
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col sm={12} md={3} className={classes.padding0}>
                    <Grid>
                        <Grid.Col sm={12}>
                            <WhiteLabel label="Total tokens" className={classes.textcenter} />
                        </Grid.Col>
                        <Grid.Col sm={12} style={{ paddingTop: 0 }}>
                            <WhiteLabel label={formatDecimalWeb3(BigInt(token.balance) + stake.stakedInfo.amount)} className={classes.textcenter} />
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col sm={12} md={3} className={classes.padding_right0}>
                    <MantineProvider
                        theme={{
                            colors: {
                                'brightorange': ['#FF8800', '#FF8800', '#FF8800', '#FF8800', '#FF8800', '#FF8800', '#FF8800']
                            },
                        }}
                    >
                        <Button className={classes.button} onClick={() => onStakeTokens()} color="brightorange">
                            Stake ELUM
                        </Button>
                    </MantineProvider>
                </Grid.Col>
            </Grid>
        </Box>
        // <Box label="Wallet Balance">
        //     <Grid style={{ width: '100%' }}>
        //         <Grid.Col sm={12} md={4} className={classes.padding0}>
        //             <WhiteLabel label={formatDecimalWeb3(BigInt(token.balance))} />
        //         </Grid.Col>
        //         <Grid.Col sm={12} md={6} className={classes.padding0}>
        //             <MantineProvider
        //                 theme={{
        //                     colors: {
        //                         'brightorange': ['#FF8800', '#FF8800', '#FF8800', '#FF8800', '#FF8800', '#FF8800', '#FF8800']
        //                     },
        //                 }}
        //             >
        //                 <Button
        //                     size="xs"
        //                     onClick={() => onStakeTokens()}
        //                     className={classes.button}
        //                     color="brightorange">
        //                     Stake ELUM
        //                 </Button>
        //             </MantineProvider>
        //         </Grid.Col>
        //     </Grid>
        // </Box>
    );
});

interface Props { }