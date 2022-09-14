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
import { useEffect, useState } from "react";
import Box from "@/components/Container/Box";
import { getNFTIDFromAddress } from "../utils";
import { observer } from 'mobx-react-lite';

const { ethereum } = require('../global.js').getWindow();
const { BACKEND_URL } = publicConfig;

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    },

    NFTTable: {
        background: 'white',
        color: 'black',
        width: '100%'
    },

    green: {
        color: 'green'
    },

    center: {
        textAlign: 'center'
    },

    button : {
        color : 'black', 
        borderColor : 'black',
        marginLeft : 10,
        marginRight : 10
    },

    thead : {
        borderBottom : '1px solid black'
    },

    th : {
        borderBottom : '1px solid black'
    }
}));

export default observer(() => {
    const { classes, theme } = useStyles();
    const { god, lang } = useStore();

    const [nftOwner, setNFTOwner] = useState(false);
    const [minerName, setMinerName] = useState(' ');
    const [nftID, setNFTID] = useState(-1);
    const [is_working, setWorkStatus] = useState(false);

    useEffect(() => {
        if (god.currentNetwork.account !== undefined) {
            setNFTID(getNFTIDFromAddress(god.currentNetwork.account));
            isActive().then((data) => setWorkStatus(data));
        }
    }, [god.currentNetwork.account]);

    useEffect(() => {
        if (god.currentNetwork.account === undefined)
            return;
        hasNFT()
            .then((data) => {
                setNFTOwner(data);
                if (data === true) {
                    const url = `${BACKEND_URL}/api/device_status/miner?address=${god.currentNetwork.account}`;
                    $.get(url)
                        .then((data) => {
                            let info: any = data.data;
                            if (info.status === 'ERR') {
                                Swal.fire(
                                    'Error',
                                    `<p>${info.message}</p>`,
                                    'error'
                                )
                            } else {
                                setMinerName(info.miner)
                            }
                        })
                        .catch((err) => {
                            Swal.fire(
                                'Error',
                                '<p>Connection Error</p>',
                                'error'
                            )
                        });
                }
            })
            .catch((err) => {
                setNFTOwner(false)
            });
    }, [god.currentNetwork.account]);

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
                address: NFTContractAddress,
                abi: NFTContractABI.abi,
                method: 'balanceOf',
                params: [god.currentNetwork.account]
            });
            if (data[0] > 0)
                return true;
            return false;
        } catch (err) {
            return false;
        }
    }

    const isActive = async () => {
        try {
            let ret = await $.get(`${BACKEND_URL}/api/device_status/isActive?address=${god.currentNetwork.account}`);
            return ret.data.active;
        } catch (err) {
            return false;
        }
    }

    const getNounce = async () => {
        try {
            let ret = await $.post(`${BACKEND_URL}/api/device_auth/getNounce`, {
                address: god.currentNetwork.account
            });
            return ret.data.nounce;
        } catch (err) {
            return null;
        }
    }

    const getSessionID = async (password) => {
        try {
            let ret = await $.post(`${BACKEND_URL}/api/device_auth/login`, {
                address: god.currentNetwork.account,
                password: password
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

        const processLogin = async () => {
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

                $.post(url, { signature: sessionID, nftID : getNFTIDFromAddress(nftID), wallet }, {

                });
            } else {
                Swal.fire(
                    'Error!',
                    'Errors occured while creating signature',
                    'error'
                )
            }
        };

        const active = await isActive();

        // we don't need to show error messages.
        // processLogin();

        if (active == true) {
            Swal.fire({
                title : 'Warning',
                html : `<p>This NFT is already assigned to a different miner, continuing will replace the existing connection.</p>`,
                icon : 'warning',
                showCancelButton: true,
            }).then((result) => {
                if (!result.isConfirmed) 
                    return;
                processLogin();
            });
        } else {
            processLogin();
        }
    };

    // for testing purpose
    const verifyMessage = (signature, message) => {
        const globalAccount = (god.currentNetwork as NetworkState).account;
        try {
            const from = globalAccount;
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
            <Box label="My Miners">
                <table className={classes.NFTTable}>
                    <thead className={classes.thead}>
                        <tr>
                            <th className={classes.th} key="1">Miner Name</th>
                            <th className={classes.th} key="2">NFT</th>
                            <th className={classes.th} key="3">Connection Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={classes.center} key="1">
                                {minerName}
                            </td>
                            <td className={`${classes.green} ${classes.center}`} key="2">
                                <div>
                                    {nftID}
                                    <Button
                                        onClick={onSendSignature}
                                        className={classes.button}
                                        variant="white"
                                        size="xs">
                                        {is_working ? 'Remove Connection' : 'Secure Connection'}
                                    </Button>
                                </div>
                            </td>
                            <td className={`${classes.green} ${classes.center}`} key="3">
                                Valid
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Box>
        </Layout>
    );
});