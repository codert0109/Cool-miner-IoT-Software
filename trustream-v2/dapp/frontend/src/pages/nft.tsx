import React, { useEffect, useState } from "react";
import Layout from "@/components/EntireLayout";
import { createStyles, Table, Progress, Anchor, Button, Text, TextInput, Group, ScrollArea, SimpleGrid } from '@mantine/core';
const BigNumber = require("bignumber.js");

import NFTStore from "../components/Blockchain/NFT";
import { FloatingLabelInput } from "../components/FloatingLabelInput";

import Swal from 'sweetalert2'


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
    }
}));

export default function TableReviews() {
    const { classes, theme } = useStyles();
    // const { god, lang } = useStore();

    const [tableData, setTableData] = useState([]);
    const [account, setAccount] = useState(null);

    const [isBuying, setBuyStatus] = useState(false);

    const [normalBuyCnt, setNormalBuyCnt] = useState(0);
    const [specialBuyCnt, setSpecialBuyCnt] = useState(0);

    const [normalTransferCnt, setNormalTransferCnt] = useState(0);
    const [specialTransferCnt, setSpecialTransferCnt] = useState(0);
    const [walletTransferArddress, setWalletAddress] = useState(0);

    const rows = tableData.map((row) => {
        let leftSupply = row.maxSupply - row.totalSupply;
        let supplyP = row.totalSupply * 100 / Math.max(1, row.maxSupply);
        let leftP = 100 - supplyP;

        return (
            <>
                <tr key={row.type}>
                    <td>{row.type}</td>
                    <td>{row.price}</td>
                    <td>
                        {row.maxSupply ?
                            <>
                                <Group position="apart">
                                    <Text size="xs" color="teal" weight={700}>
                                        {row.totalSupply} using
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
                    <td>{row.balance}</td>
                </tr>
            </>
        );
    });

    const onStatus = (info) => {
        setTableData(info.Info);
        setAccount(info.account);
    };

    const onTransferNFT = async () => {
        let _normalCnt = parseInt(normalTransferCnt.toString());
        let _specialCnt = parseInt(specialTransferCnt.toString());

        console.log('normal', _normalCnt);
        console.log('special', _specialCnt);
        console.log('wallet', walletTransferArddress);

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
                    'You bought NFTs!',
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

    return (
        <Layout>
            <ScrollArea>
                <NFTStore onStatus={onStatus} />
                <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Supply</th>
                            <th>Balance</th>
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
                <FloatingLabelInput onChange={setNormalBuyCnt} label="Normal NFT" placeholder="Input an number." />
                <FloatingLabelInput onChange={setSpecialBuyCnt} label="Special NFT" placeholder="Input an number." />
                <div></div>
                <Button onClick={onBuyNFT} className={classes.gridDivBtn}>
                    Buy NFT
                </Button>
            </SimpleGrid>
            <SimpleGrid
                cols={4}
                breakpoints={[
                    { maxWidth: 'xl', cols: 4 },
                    { maxWidth: 'md', cols: 4 },
                    { maxWidth: 'sm', cols: 2 },
                ]}
                className={classes.gridDiv}
            >
                <FloatingLabelInput onChange={setNormalTransferCnt} label="Normal NFT" placeholder="Input an number." />
                <FloatingLabelInput onChange={setSpecialTransferCnt} label="Special NFT" placeholder="Input an number." />
                <FloatingLabelInput onChange={setWalletAddress} label="Wallet Address" placeholder="Input an wallet address." />
                <Button onClick={onTransferNFT} className={classes.gridDivBtn}>
                    Transfer NFT
                </Button>
            </SimpleGrid>
        </Layout>
    );
}