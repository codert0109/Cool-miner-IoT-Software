import React, { useEffect, useState } from "react";
import Layout from "@/components/EntireLayout";
import { createStyles, Table, Progress, Anchor, Button, Text, TextInput, Group, ScrollArea, SimpleGrid } from '@mantine/core';
import Swal from 'sweetalert2'
import axios from "axios";
import { useStore } from '@/store/index';
import Loading from "../components/Loading";
import NFTMinerNode from "@/components/NFTMinerNode";
import NFTStatus from "@/components/NFTMinerNode/NFTStatus";
import { observer } from 'mobx-react-lite';
import Router, { useRouter } from 'next/router';
import { publicConfig } from "../config/public";
const { BACKEND_URL } = publicConfig;

const BigNumber = require("bignumber.js");
let window = require('../global.js');

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    },
    root: {
        position: 'relative',
    },
    input: {
        height: 'auto',
        paddingTop: 18,
    },
    label: {
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: theme.fontSizes.xs,
        paddingLeft: theme.spacing.sm,
        paddingTop: theme.spacing.sm / 2,
        zIndex: 1,
    },
    gridDiv: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px'
    },
    gridDivBtn: {
        marginTop: '16px',
        marginLeft: 10
    },
    marginBottom: {
        marginBottom: '10px'
    },
    marketplace: {
        fontSize: '1.5rem',
        paddingLeft: 10
    },
    caption: {
        fontSize: '1.5rem',
        paddingLeft: 10
    },
    infodiv: {
        padding: 5,
        paddingLeft: 0,
        marginTop: 10,
        marginLeft: 10,
        fontSize: '1.2rem',
        marginBottom: 10,
        cursor: 'pointer',
        height: 40,
        display: 'flex',
        alignItems: 'center',
    },
    warning: {
        border: '2px solid #1864ab',
        borderLeft: '5px solid #1864ab',
        backgroundColor: '#4784e4',
        paddingLeft: 10,
        color : '#FFFFFF'
    }
}));

export default observer(() => {
    const { classes, theme } = useStyles();
    const { god, nft } = useStore();
    const [pending, isPending] = useState(false);

    useEffect(() => {
        nft.refresh();
    }, [god.currentNetwork.account]);

    // Update when url changes detect
    useEffect(() => {
        Router.events.on('routeChangeComplete', () => {
            nft.refresh();
        });
    }, []);

    // const onTransferNFT = async () => {
    //     let _normalCnt = parseInt(normalTransferCnt.toString());
    //     let _specialCnt = parseInt(specialTransferCnt.toString());
    //     if (_normalCnt < 0 || _specialCnt < 0 || (_normalCnt + _specialCnt == 0)) {
    //         Swal.fire(
    //             'Error!',
    //             'Transfer Number Should Be Positive.',
    //             'error'
    //         )
    //         return;
    //     }

    //     if (walletTransferArddress == 0) {
    //         Swal.fire(
    //             'Error!',
    //             'Wallet cannot be empty.',
    //             'error'
    //         )
    //         return;
    //     }

    //     const tx = window._NFT.transferNFT(_normalCnt, _specialCnt, walletTransferArddress);

    //     try {
    //         const receipt = await tx;
    //         if (receipt.status == 0) {
    //             Swal.fire(
    //                 'Error!',
    //                 'Action failed',
    //                 'error'
    //             )
    //         } else {
    //             await receipt.wait();
    //             Swal.fire(
    //                 'Awesome!',
    //                 'You transfered NFTs!',
    //                 'success'
    //             )
    //         }
    //     } catch (error) {
    //         const ERROR_CODE_TX_REJECTED_BY_USER = 4001;
    //         if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
    //             Swal.fire(
    //                 'Error!',
    //                 'You rejected transaction.',
    //                 'error'
    //             )
    //             return;
    //         } else {

    //             Swal.fire(
    //                 'Error!',
    //                 'Something went wrong.',
    //                 'error'
    //             )
    //         }
    //     }
    // };

    const onBuyNFT = async (type_id: number) => {
        if (nft.loading) {
            Swal.fire(
                'Error!',
                'Cannot Buy NFT while loading information.',
                'error'
            )
            return;
        }

        let totalPrice = nft.typeList[type_id].price;

        let PriceinWei = new BigNumber(totalPrice) * new BigNumber(Math.pow(10, 18));

        const tx = nft.buyNFT(type_id, 1, PriceinWei.toString());

        isPending(true);

        try {
            const receipt: any = await tx;
            if (receipt.status == 0) {
                Swal.fire(
                    'Error!',
                    'Action failed',
                    'error'
                )
            } else {
                await receipt.wait();
                Swal.fire(
                    'Awesome!',
                    'Your NFT purchase has been completed!',
                    'success'
                )
                nft.refresh();
            }
        } catch (error) {
            const ERROR_CODE_TX_REJECTED_BY_USER = 4001;
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                Swal.fire(
                    'Error!',
                    'You rejected transaction.',
                    'error'
                )
                return;
            } else {
                let reason = error.reason;
                if (reason.indexOf('The wallet address should be in the approved list.') !== -1) {
                    reason = "Your wallet account is not approved to buy this NFT.";
                }
                Swal.fire(
                    'Error!',
                    reason,
                    'error'
                )
            }
        } finally {
            isPending(false);
        }
    };

    const hasNFT = () => {
        return nft.idList.length > 0;
    };

    const hasBalance = () => {
        return god.currentChain.Coin.balance.format != 0;
    };

    const onClaimTokens = () => {
        if (nft.loading) {
            Swal.fire(
                'Error!',
                'Cannot Buy NFT while loading information.',
                'error'
            )
        }
        if (hasNFT() || hasBalance()) {
            Swal.fire(
                'Error!',
                'You can not claim tokens since you already buy an NFT.',
                'error'
            )
            return;
        }
        axios.post(`${BACKEND_URL}/api/claim_tokens`, { account: god.currentNetwork.account })
            .then((data) => {
                if (data.data == 'success') {
                    god.pollingData();
                    console.log('call polling data');
                    setTimeout(() => {
                        god.currentNetwork.loadBalance();
                    }, 2000);
                    Swal.fire(
                        'Congratulations!',
                        '10 IoTex coins were successfully transferred to your account!',
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Error!',
                        'Something went wrong!',
                        'error'
                    )
                }
            })
            .catch((err) => {
                console.error('err received', err);
            });
    };

    const renderOWNEDNFT = () => {
        if (hasNFT() == false) {
            return (
                <div className={classes.infodiv + ' ' + classes.warning}>
                    You need to buy an NFT in order to mine.
                </div>
            )
        }

        return (
            <>
                <div className={classes.caption}>OWNED</div>
                {
                    nft.infoList.map((item, index) => {
                        return (
                            <NFTStatus
                                title="Testnet Miner"
                                imgurl="/images/nft/TestNet.png"
                                price={nft.typeList[item.nftType].price + " IOTX"} 
                                acquiredTime={item.acquireTime}
                                id={nft.idList[index]}
                                />
                        )
                    })
                }
            </>
        );
    };

    return (
        <Layout>
            {nft.loading && <Loading />}
            {!nft.loading &&
                <>
                    {!hasNFT() && !hasBalance() &&
                        <Button onClick={onClaimTokens} className={classes.gridDivBtn}>
                            Claim Tokens
                        </Button>}
                    {renderOWNEDNFT()}

                    <div className={classes.marketplace}>MARKETPLACE</div>
                    <SimpleGrid
                        cols={3}
                        breakpoints={[
                            { maxWidth: 'xs', cols: 1 },
                        ]}
                    >
                        <NFTMinerNode
                            title="Testnet Miner"
                            imgurl="/images/nft/TestNet.png"
                            price={nft.typeList[0].price + " IOTX"}
                            comment={"Qty available " + nft.typeList[0].remainSupply}
                            callback={() => onBuyNFT(0)}
                            pending={pending}
                            disabled={pending}
                            id={nft.typeList[0].totalSupply - nft.typeList[0].remainSupply} />
                        <NFTMinerNode
                            title="Public Pool Miner - mainnet"
                            imgurl="/images/nft/PublicPool.png"
                            price="xx"
                            comment="Qty available Limited"
                            text="COMING SOON! LIMITED AVAILABILITY"
                            disabled={true} />
                        <NFTMinerNode
                            title="Webcam Miner - Phase 2"
                            imgurl="/images/nft/Webcam.png"
                            price="xx"
                            comment="Qty available xx"
                            text="COMING in Phase 2!"
                            disabled={true} />
                    </SimpleGrid>
                </>}
        </Layout>
    );
});