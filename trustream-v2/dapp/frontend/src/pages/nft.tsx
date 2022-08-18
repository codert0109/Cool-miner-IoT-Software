import React, { useEffect, useState } from "react";
import Layout from "@/components/EntireLayout";
import { createStyles, Table, Progress, Anchor, Button, Text, TextInput, Group, ScrollArea, SimpleGrid } from '@mantine/core';
const BigNumber = require("bignumber.js");

import NFTStore from "../components/Blockchain/NFT";
import { FloatingLabelInput } from "../components/FloatingLabelInput";

import Swal from 'sweetalert2'
import axios from "axios";

import { useStore } from '@/store/index';
import Loading from "../components/Loading";
import NFTMinerNode from "@/components/NFTMinerNode";

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
        marginTop: '16px'
    },
    marginBottom: {
        marginBottom: '10px'
    }
}));

export default function TableReviews() {
    const { classes, theme } = useStyles();
    const { god } = useStore();

    const [tableData, setTableData] = useState([]);
    const [account, setAccount] = useState(null);

    const [isBuying, setBuyStatus] = useState(false);

    const [normalBuyCnt, setNormalBuyCnt] = useState(1);
    const [specialBuyCnt, setSpecialBuyCnt] = useState(0);

    const [normalTransferCnt, setNormalTransferCnt] = useState(1);
    const [specialTransferCnt, setSpecialTransferCnt] = useState(0);
    const [walletTransferArddress, setWalletAddress] = useState(0);

    const [isloading, setLoading] = useState(true);

    const rows = tableData.filter((item, index) => index == 0).map((row) => {
        let leftSupply = row.maxSupply - row.totalSupply;
        let supplyP = row.totalSupply * 100 / Math.max(1, row.maxSupply);
        let leftP = 100 - supplyP;

        return (
            <>
                <tr key={row.type}>
                    <td>{row.type == 'NormalNFT' ? 'Public Pool NFT' : ''}</td>
                    <td>{row.price}</td>
                    <td>
                        {row.maxSupply ?
                            <>
                                <Group position="apart">
                                    <Text size="xs" color="teal" weight={700}>
                                        {row.totalSupply} sold
                                    </Text>
                                    <Text size="xs" color="red" weight={700}>
                                        {leftSupply} left
                                    </Text>
                                </Group>
                                <Progress
                                    classNames={{ bar: classes.progressBar }}
                                    sections={[
                                        {
                                            value: supplyP,
                                            color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
                                        },
                                        {
                                            value: leftP,
                                            color: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
                                        },
                                    ]}
                                />
                            </>
                            : 'no supply'
                        }
                    </td>
                    <td>{row.balance > 0 ? 'Yes' : 'No'}</td>
                </tr>
            </>
        );
    });

    const onStatus = (info) => {
        // console.log('onStatus', info);
        setTableData(info.Info);
        setAccount(info.account);
        setLoading(false);
    };

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

        totalPrice = new BigNumber(`${totalPrice}e18`);

        const tx = window._NFT.verifyNFT(_normalCnt, _specialCnt, {
            value: totalPrice.toString(),
            from: account
        });

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
                Swal.fire(
                    'Error!',
                    error.reason,
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
        axios.post(`/api/claim_tokens`, { account })
            .then((data) => {
                if (data.data == 'success') {
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

    return (
        <Layout>
            <NFTStore onStatus={onStatus} />
            {isloading && <Loading />}
            {!isloading &&
                <>
                    <ScrollArea>
                        {!hasNFT() && !hasBalance() &&
                            <Button onClick={onClaimTokens} className={classes.gridDivBtn}>
                                Claim Tokens
                            </Button>}
                        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Supply</th>
                                    <th>Owned</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                    </ScrollArea>
                    <SimpleGrid
                        cols={4}
                        breakpoints={[
                            { maxWidth: 'xl', cols: 4 },
                            { maxWidth: 'md', cols: 4 },
                            { maxWidth: 'sm', cols: 2 },
                        ]}
                        className={classes.gridDiv}
                    >
                        <Button disabled={hasNFT()} onClick={onBuyNFT} className={classes.gridDivBtn}>
                            Buy NFT
                        </Button>
                        <div></div>
                        {/* <FloatingLabelInput onChange={setWalletAddress} label="Wallet Address" placeholder="Input an wallet address." />
                        <Button disabled={!hasNFT()} onClick={onTransferNFT} className={classes.gridDivBtn}>
                            Transfer NFT
                        </Button> */}
                    </SimpleGrid>
                </>
            }

            {/* <div>MARKETPLACE</div>
            <SimpleGrid
                cols={3}
                breakpoints={[
                    { maxWidth: 'sm', cols: 1 },
                ]}
            >
                <NFTMinerNode 
                    title="Testnet Miner"
                    imgurl="/images/nft/TestNet.png"
                    price="3 IOTX"
                    comment="Qty available 250"/>
                <NFTMinerNode 
                    title="Public Pool Miner - mainnet"
                    imgurl="/images/nft/PublicPool.png"
                    price="xx"
                    comment="Qty available Limited"/>
                <NFTMinerNode 
                    title="Webcam Miner - mainnet"
                    imgurl="/images/nft/Webcam.png"
                    price="xx"
                    comment="Qty available xx"/>
            </SimpleGrid> */}
        </Layout>
    );
}