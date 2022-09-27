import { FloatingLabelInput } from "@/components/FloatingLabelInput";
import { createStyles, Button, ScrollArea, SimpleGrid, Loader } from '@mantine/core';
import { useStore } from '@/store/index';
import React, { useState } from "react";
import NFTContractABI from '../../../contracts/ElumNFT.json';
import ContractAddress from '../../../contracts/contract-address.json';
import Swal from 'sweetalert2'

const useStyles = createStyles((theme) => ({
    gridDiv: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px'
    },
    gridDivBtn: {
        marginTop: '16px'
    },
    loader : {
        marginRight : '10px'
    }
}));



export default function TableReviews() {
    const { classes, theme } = useStyles();
    const { god, lang } = useStore();
    const [walletAddress, setWalletAddress] = useState(0);
    const [pending, isPending] = useState(false);

    const onNewTesterAdd = () => {
        const NFTContractAddress = ContractAddress.ElumNFT;
        isPending(true);
        god.currentNetwork.execContract({
          address : NFTContractAddress,
          abi : NFTContractABI.abi,
          method : 'affectWhiteList',
          params : [[walletAddress], true]
        }).then(async (tx) => {
            const receipt = await tx;
            await receipt.wait();
            Swal.fire(
                'Success',
                `${walletAddress} added to beta tester lists successfully!`,
                'success'
            )
            isPending(false);
        }).catch((error) => {
            const ERROR_CODE_TX_REJECTED_BY_USER = 4001;
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                Swal.fire(
                    'Info',
                    'You rejected transaction.',
                    'info'
                )
            } else {
                Swal.fire(
                    'Error!',
                    error.reason,
                    'error'
                )
            }
            isPending(false);
        });
    };

    return (
        <SimpleGrid
                cols={2}
                breakpoints={[
                    { maxWidth: 'sm', cols: 1 },
                ]}
                className={classes.gridDiv}
            >
            <FloatingLabelInput onChange={setWalletAddress} label="Wallet Address" placeholder="Input an wallet address." />
            <Button disabled={pending} className={classes.gridDivBtn} onClick={onNewTesterAdd}>
                {pending && <Loader size="xs" className={classes.loader} />}
                Add To BetaTester Lists
            </Button>
        </SimpleGrid>
    );
}