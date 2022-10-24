import Layout from "@/components/EntireLayout";
import { createStyles, Button, ScrollArea, Grid, TextInput, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { useStore } from "@/store/index";
import Swal from "sweetalert2";

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    },
}));

interface Props { }

export default observer((props: Props) => {
    const { nft } = useStore();
    const [scrolled, setScrolled] = useState(false);
    const [pending, isPending] = useState(false);
    const [maxNFTPerWallet, setMaxNFTPerWallet] = useState(0);

    // effect
    useEffect(() => {
        setMaxNFTPerWallet(nft.maxNFTPerWallet);
    }, [nft.maxNFTPerWallet]);

    // event handlers
    const onMaxNFTPerWalletChange = (event) => {
        setMaxNFTPerWallet(event.currentTarget.value);
    };

    const onMaxNFTPerWalletUpdate = async () => {
        const tx = nft.setMaxNFTPerWallet(maxNFTPerWallet);

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
                    'Success!',
                    'Update the max NFT per wallet successfully!',
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

    return (
        <ScrollArea
            sx={{ height: 'calc(100vh - 200px)' }}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Grid>
                <Grid.Col sm={12} md={4}>
                    Max NFT per Wallet
                </Grid.Col>
                <Grid.Col sm={12} md={4}>
                    {nft.loading && <Loader size="sm" />}
                    {!nft.loading &&
                        <TextInput
                            type="number"
                            value={maxNFTPerWallet}
                            onChange={onMaxNFTPerWalletChange}>
                        </TextInput>}
                </Grid.Col>
                <Grid.Col sm={12} md={4}>
                    <Button 
                        disabled={pending}
                        onClick={() => onMaxNFTPerWalletUpdate()}>
                        {pending && <Loader size="xs" style={{ marginRight : 10 }}/>}Update
                    </Button>
                </Grid.Col>
            </Grid>
        </ScrollArea>
    );
});