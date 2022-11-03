import Layout from "@/components/EntireLayout";
import { createStyles, Button, ScrollArea, Grid, TextInput, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { useStore } from "@/store/index";
import Swal from "sweetalert2";
import { publicConfig } from "../../../config/public";
const { BACKEND_URL } = publicConfig;

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    },
}));

interface Props { }

export default observer((props: Props) => {
    const { nft, auth } = useStore();
    const [scrolled, setScrolled] = useState(false);
    const [pending, isPending] = useState(false);
    const [tokenPerEpoch, setTokenPerEpoch] = useState(0);

    // event handlers
    const onTokenPerEpochChange = (event) => {
        setTokenPerEpoch(event.currentTarget.value);
    };

    const onSubmit = async () => {
        // isPending
        isPending(true);
        const performAction = () => {
            auth.$().post(`${BACKEND_URL}/api/claim_tokens/updateDistributeToken`, {
                token : tokenPerEpoch
            })
            .then((data) => {
                Swal.fire(
                    'Success',
                    `<p>Updating Claim Per Epoch Success!</p>`,
                    'success'
                );
                isPending(false)
            }).catch((err) => {
                Swal.fire(
                    'Error',
                    `<p>Updating Claim Per Epoch Failed!</p>`,
                    'error'
                );
                console.error(err);
                isPending(false)
            })
        };

        auth.actionWithAuth(performAction);
    };

    useEffect(() => {
        auth.$().get(`${BACKEND_URL}/api/claim_tokens/getDistributeToken`)
        .then((data) => {
            setTokenPerEpoch(data.data.message.value);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <ScrollArea
            sx={{ height: 'calc(100vh - 200px)' }}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Grid>
                <Grid.Col sm={12} md={4}>
                    Distribute Token Per Epoch
                </Grid.Col>
                <Grid.Col sm={12} md={4}>
                    {nft.loading && <Loader size="sm" />}
                    {!nft.loading &&
                        <TextInput
                            type="number"
                            value={tokenPerEpoch}
                            onChange={onTokenPerEpochChange}>
                        </TextInput>}
                </Grid.Col>
                <Grid.Col sm={12} md={4}>
                    <Button 
                        disabled={pending}
                        onClick={() => onSubmit()}>
                        {pending && <Loader size="xs" style={{ marginRight : 10 }}/>}Update
                    </Button>
                </Grid.Col>
            </Grid>
        </ScrollArea>
    );
});