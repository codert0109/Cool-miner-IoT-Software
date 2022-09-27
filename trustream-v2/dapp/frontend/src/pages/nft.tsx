import React, { useEffect, useState } from "react";
import Layout from "@/components/EntireLayout";
import { createStyles, Table, Progress, Anchor, Button, Text, TextInput, Group, ScrollArea, SimpleGrid } from '@mantine/core';
import NFTStore from "../components/Blockchain/NFT";
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
    }
}));

export default observer(() => {
    const { classes, theme } = useStyles();
    const { god, nft } = useStore();

    const [tableData, setTableData] = useState([]);
    const [account, setAccount] = useState(null);

    const [isBuying, setBuyStatus] = useState(false);

    const [normalBuyCnt, setNormalBuyCnt] = useState(1);
    const [specialBuyCnt, setSpecialBuyCnt] = useState(0);

    const [normalTransferCnt, setNormalTransferCnt] = useState(1);
    const [specialTransferCnt, setSpecialTransferCnt] = useState(0);
    const [walletTransferArddress, setWalletAddress] = useState(0);

    const [isloading, setLoading] = useState(true);

    const onStatus = (info) => {
        setTableData(info.Info);
        setAccount(info.account);
        setLoading(false);
    };

    useEffect(() => {
        if (god.currentNetwork.account === undefined)
            return;
        console.log('nft.getNFTLists called', god.currentNetwork.account);
        nft.getNFTLists().then(async (data) => {
            console.log('getNFTLists', data);
            let items: any = data;
            let normalInfo: any = await nft.getNFTInfo(0);

            console.log('getNFTInfo', normalInfo);

            if (items.length === 1) {
                onStatus({
                    account: god.currentNetwork.account,
                    Info: [
                        {
                            type: 'NormalNFT',
                            price: normalInfo.price / Math.pow(10, 18),
                            totalSupply: normalInfo.totalSupply - normalInfo.remainSupply,
                            remainSupply : normalInfo.remainSupply,
                            maxSupply: normalInfo.totalSupply,
                            balance: 1,
                            id_list : [ ...items ]
                        },
                        {
                            type: 'SpecialNFT',
                            price: 5,
                            totalSupply: 0,
                            maxSupply: 1000,
                            remainSupply : 1000,
                            balance: 0,
                            id_list : []
                        },
                    ]
                });
            } else {
                onStatus({
                    account: god.currentNetwork.account,
                    Info: [
                        {
                            type: 'NormalNFT',
                            price: normalInfo.price / Math.pow(10, 18),
                            totalSupply: normalInfo.totalSupply - normalInfo.remainSupply,
                            remainSupply : normalInfo.remainSupply,
                            maxSupply: normalInfo.totalSupply,
                            balance: 0,
                            id_list : []
                        },
                        {
                            type: 'SpecialNFT',
                            price: 5,
                            totalSupply: 0,
                            maxSupply: 1000,
                            remainSupply : 1000,
                            balance: 0,
                            id_list : []
                        },
                    ]
                });
            }
        });
    }, [god.currentNetwork.account]);

    // Update when url changes detect
    useEffect(() => {
        Router.events.on('routeChangeComplete', () => {
            setLoading(true);
        });
    }, []);

    const onTransferNFT = async () => {
        let _normalCnt = parseInt(normalTransferCnt.toString());
        let _specialCnt = parseInt(specialTransferCnt.toString());
        if (_normalCnt < 0 || _specialCnt < 0 || (_normalCnt + _specialCnt == 0)) {
            Swal.fire(
                'Error!',
                'Transfer Number Should Be Positive.',
                'error'
            )
            return;
        }

        if (walletTransferArddress == 0) {
            Swal.fire(
                'Error!',
                'Wallet cannot be empty.',
                'error'
            )
            return;
        }

        const tx = window._NFT.transferNFT(_normalCnt, _specialCnt, walletTransferArddress);

        try {
            const receipt = await tx;
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
                    'You transfered NFTs!',
                    'success'
                )
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

                Swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                )
            }
        }
    };

    const onBuyNFT = async () => {
        let _normalCnt = parseInt(normalBuyCnt.toString());
        let _specialCnt = parseInt(specialBuyCnt.toString());

        let _normalPrice = -1, _specialPrice = -1;

        tableData.forEach((item, index) => {
            if (item.type == 'NormalNFT') {
                _normalPrice = item.price;
            } else if (item.type == 'SpecialNFT') {
                _specialPrice = item.price;
            }
        });

        if (_normalPrice == -1) {
            console.log('not received price data');
            return;
        }

        let totalPrice = _normalCnt * _normalPrice + _specialCnt * _specialPrice;

        let PriceinWei = new BigNumber(totalPrice) * new BigNumber(Math.pow(10, 18));

        const tx = nft.buyNFT(0, 1, PriceinWei.toString());

        try {
            const receipt : any = await tx;
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
        }
    };

    const hasNFT = () => {
        return tableData[0] ? tableData[0].balance > 0 : false;
    };

    const hasBalance = () => {
        return god.currentChain.Coin.balance.format != 0;
    };

    const onClaimTokens = () => {
        if (hasNFT() || hasBalance()) {
            Swal.fire(
                'Error!',
                'You can not claim tokens since you already buy an NFT.',
                'error'
            )
            return;
        }
        axios.post(`${BACKEND_URL}/api/claim_tokens`, { account })
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

    const getInfo = () => {
        return tableData.filter((item, index) => index == 0).map((row) => {
            return {
                price   : row.price,
                left    : row.remainSupply,
                id      : row.id_list.length > 0 ? row.id_list[0].toString() : -1
            }
        })[0];
    }

    return (
        <Layout>
            {isloading && <Loading />}
            {!isloading &&
                <>
                    {!hasNFT() && !hasBalance() &&
                        <Button onClick={onClaimTokens} className={classes.gridDivBtn}>
                            Claim Tokens
                        </Button>}
                    {<NFTStatus
                        nftStatus={hasNFT()}
                        title="Testnet Miner"
                        imgurl="/images/nft/TestNet.png"
                        price={getInfo().price + " IOTX"} />}
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
                            price={getInfo().price + " IOTX"}
                            comment={"Qty available " + getInfo().left}
                            callback={onBuyNFT}
                            disabled={hasNFT()}
                            id={getInfo().id} />
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