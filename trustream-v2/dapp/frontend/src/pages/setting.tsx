import Layout from "@/components/EntireLayout";
import { createStyles, Button, ScrollArea } from '@mantine/core';
import { Send } from 'tabler-icons-react';
import { publicConfig } from "../config/public";
import { useStore } from '../store/index';
import { NetworkState } from '@/store/lib/NetworkState';
import $ from "axios";
import bops from "bops";
import { recoverPersonalSignature } from "eth-sig-util";

const { ethereum } = require('../global.js').getWindow();



const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    },
}));

export default function TableReviews() {
    const { classes, theme } = useStyles();
    const { god, lang } = useStore();

    const signMessage = async () => {
        console.log('global', require('../global.js'));
        const message = 'Very Message Such Wow';
        const globalAccount = (god.currentNetwork as NetworkState).account;
        // document.getElementById("messageString").innerHTML = JSON.stringify(message);
        try {
            const from = globalAccount;
            console.log('from : ' + from);
            // const msg = `${message}`;
            const msg = `0x${bops.from(message, 'utf8').toString('hex')}`;
            // document.getElementById("messageHex").innerHTML = JSON.stringify(msg);
            console.log('msg : ' + msg);
            const sign = await ethereum.request({
                method: 'personal_sign',
                params: [msg, from, 'Random text'],
            });
            console.log('sign : ' + sign);
            return sign;
            // document.getElementById("signature").innerHTML = JSON.stringify(sign);
        } catch (err) {
            console.error(err);
        }
    }

    const onSendSignature = async () => {
        const url = `${publicConfig.DEVICE_URL}/set_signature`;
        const signature = await signMessage();
        const wallet = god.currentNetwork.account;
        verifyMessage(signature);
        $.post(url, { signature, wallet}, {

        });
    };

    const verifyMessage = (signature) => {
        const message = 'Very Message Such Wow';
        const globalAccount = (god.currentNetwork as NetworkState).account;
        // const web3 = new Web3(window.ethereum);

        try {
            const from = globalAccount;
            const msg = `0x${bops.from(message, 'utf8').toString('hex')}`;

            const recoveredAddr = recoverPersonalSignature({data: msg, sig: signature});
            console.log('recoveredAddr : ' + recoveredAddr);
            // document.getElementById("recoveredAddress").innerHTML = "Recovered Address: " +
                recoveredAddr
            if (recoveredAddr.toLowerCase() === from.toLowerCase()) {
                console.log(`Successfully ecRecovered signer as ${recoveredAddr}`);
                // document.getElementById('result').innerHTML = `Verified !`;
            } else {
                console.log(
                    `Failed to verify signer when comparing ${recoveredAddr} to ${from}`,
                );
                // document.getElementById('result').innerHTML = `Not Verified :(`;
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Layout>
            <ScrollArea>
                <Button onClick={onSendSignature} rightIcon={<Send size={18} />} sx={{ paddingRight: 12 }}>
                    Send Signature
                </Button>
            </ScrollArea>
        </Layout>
    );
}