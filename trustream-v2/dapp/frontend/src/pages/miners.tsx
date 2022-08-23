import Layout from "@/components/EntireLayout";
import { createStyles, Button, ScrollArea } from '@mantine/core';
import { Send } from 'tabler-icons-react';
import { publicConfig } from "../config/public";
import { useStore } from '../store/index';
import { NetworkState } from '@/store/lib/NetworkState';
import $ from "axios";
import { recoverPersonalSignature } from "eth-sig-util";
import Swal from 'sweetalert2';
import NFTContractABI from '../contracts/NFT.json';
import ContractAddress from '../contracts/contract-address.json';

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
    
    const signMessage = async (message) => {
        const globalAccount = (god.currentNetwork as NetworkState).account;
        try {
            const from = globalAccount;
            const sign = await ethereum.request({
                method: 'personal_sign',
                params: [message, from, 'Random text'],
            });
            return sign;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    const hasNFT = async () => {
        const NFTContractAddress = ContractAddress.NFT;
        try {
            let data = await god.currentNetwork.execContract({
                address : NFTContractAddress,
                abi     : NFTContractABI.abi,
                method  : 'balanceOf',
                params  : [god.currentNetwork.account]
            });
            if (data[0] > 0)
                return true;
            return false;
        } catch (err) {
            return false;
        }
    }

    const getNounce = async () => {
        try {
            let ret = await $.post('https://miner.elumicate.com/api/device_auth/getNounce', {
                address : god.currentNetwork.account
            });
            return ret.data.nounce;
        } catch (err) {
            return null;
        }
    }

    const getSessionID = async (password) => {
        try {
            let ret = await $.post('https://miner.elumicate.com/api/device_auth/login', {
                address : god.currentNetwork.account,
                password : password
            });
            return ret.data.session;
        } catch (err) {
            return null;
        }
    }

    const onSendSignature = async () => {
        const nft_flg = await hasNFT();
        if (nft_flg === false) {
            Swal.fire(
                'Error',
                `<p>You do not have an NFT to secure your Mining Connection.</p>
                 <p>Please obtain a mining NFT and try again.</p>
                 <p><a href="/nft/">Buy NFT</a></p>`,
                'warning'
            )
            return false;
        }

        const nounce = await getNounce();
        if (nounce == null) {
            Swal.fire(
                'Error',
                `<p>Connection Error!</p>`,
                'error'
            );
            return false;
        }

        const url = `${publicConfig.DEVICE_URL}/set_signature`;
        const signature = await signMessage(nounce);

        if (signature !== null) {
            verifyMessage(signature, nounce);
            
            let sessionID = await getSessionID(signature);

            if (sessionID == null) {
                Swal.fire(
                    'Error',
                    `<p>Connection Error!</p>`,
                    'error'
                );
                return false;
            }

            const wallet = god.currentNetwork.account;            
            const nftID = wallet;

            $.post(url, { signature : sessionID, nftID, wallet }, {

            });
        } else {
            Swal.fire(
                'Error!',
                'Errors occured while creating signature',
                'error'
            )
        }
    };

    const verifyMessage = (signature, message) => {
        // const message = 'Very Message Such Wow';
        const globalAccount = (god.currentNetwork as NetworkState).account;
        try {
            const from = globalAccount;
            // const msg = `0x${bops.from(message, 'utf8').toString('hex')}`;
            const msg = message;
            const recoveredAddr = recoverPersonalSignature({ data: msg, sig: signature });
            if (recoveredAddr.toLowerCase() === from.toLowerCase()) {
                console.log(`Successfully ecRecovered signer as ${recoveredAddr}`);
            } else {
                console.log(
                    `Failed to verify signer when comparing ${recoveredAddr} to ${from}`,
                );
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Layout>
            <ScrollArea>
                <Button onClick={onSendSignature} rightIcon={<Send size={18} />} sx={{ paddingRight: 12 }}>
                    Secure Miner Connection
                </Button>
            </ScrollArea>
        </Layout>
    );
}