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
import { CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS } from "mobx-react-lite/dist/utils/reactionCleanupTrackingCommon";

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

    button: {
        color: 'black',
        borderColor: 'black',
        marginLeft: 10,
        marginRight: 10
    },

    thead: {
        borderBottom: '1px solid black'
    },

    th: {
        borderBottom: '1px solid black'
    }
}));

export default observer(() => {
    const { classes } = useStyles();
    const { god, auth, nft } = useStore();

    const [hasNFT, setHasNFT] = useState(false);
    const [NFTLists, setNFTLists] = useState([]);
    const [NFTStatus, setNFTStatus] = useState([]);

    const UpdateNFTStatus = () => {
        nft.getNFTLists()
            .then((data) => {
                setNFTLists(data);
                let curNFTStatus = [];
                data.forEach(item => {
                    curNFTStatus.push({
                        NFT: item,
                        Miner: 'Loading',
                        Connection: 'Loading'
                    });
                });

                setNFTStatus((e) => curNFTStatus);

                data.forEach(item => {
                    auth.$().post(`${BACKEND_URL}/api/nft_auth/status`, {
                        nft_id: item
                    }).then((data) => {
                        console.log('data', data.data.data);
                        setNFTStatus([{
                            NFT: data.data.data.nft_id,
                            Miner: data.data.data.miner ? data.data.data.miner : 'Not set',
                            Connection: data.data.data.session ? 'Secure' : 'Not Secure'
                        }]);
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            })
            .catch((err) => {
                setNFTLists([]);
            })
    };

    const Refresh = () => {
        UpdateNFTStatus();
    };

    useEffect(() => {
        UpdateNFTStatus();
    }, [god.currentNetwork.account]);

    const checkNFT = async () => {
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

    useEffect(() => {
        checkNFT()
            .then((data) => {
                setHasNFT(true);
            })
            .catch((err) => {
                setHasNFT(false);
            });
    }, [god.currentNetwork.account]);

    const onSecureMinerConnection = () => {
        if (hasNFT === false) {
            Swal.fire(
                'Error',
                `<p>You do not have an NFT to secure your Mining Connection.</p>
                 <p>Please obtain a mining NFT and try again.</p>
                 <p><a href="/nft/">Buy NFT</a></p>`,
                'warning'
            )
            return;
        }

        const performAction = () => {
            auth.$().post(`${BACKEND_URL}/api/nft_auth/create`, {
                address: god.currentNetwork.account,
                nft_id: getNFTIDFromAddress(god.currentNetwork.account),
                miner: 'unknown' // we should upgrade this one
            }).then((data) => {
                console.log('onSecureMinerConnection', data);
                Swal.fire({
                    title: 'Success',
                    html: `<p>Secure Miner Connection Success</p>`,
                    icon: 'success',
                });
                Refresh();

                const url = `${publicConfig.DEVICE_URL}/set_signature`;
                
                const wallet = god.currentNetwork.account;            
                const nftID =  getNFTIDFromAddress(wallet);

                $.post(url, { signature : data.data.session, nftID, wallet }, {

                });
            }).catch((err) => {
                Swal.fire({
                    title: 'Error',
                    html: `<p>Errors occured while securing miner connection</p>`,
                    icon: 'error',
                });
            });
        };

        auth.check_auth(
            () => {
                performAction();
            },
            () => {
                Swal.fire({
                    title: 'Error',
                    html: `<p>You need to login to secure miner connection.</p>`,
                    icon: 'error',
                    showCancelButton: true
                }).then((result) => {
                    if (!result.isConfirmed) {
                        // isPendingUptime(false);
                        return;
                    }
                    auth.login(
                        () => {
                            performAction();
                        },
                        () => {
                            Swal.fire({
                                title: 'Error',
                                html: `<p>Errors Occured while login.</p>`,
                                icon: 'error',
                            });
                            // isPendingUptime(false);
                        });
                }).catch(() => {
                    Swal.fire({
                        title: 'Info',
                        html: `<p>Securing Miner Connection has been failed.</p>`,
                        icon: 'info',
                    });
                    // isPendingUptime(false);
                });
            }
        );
    };

    const onRemoveConnection = (nft_id) => {
        const performAction = () => {
            auth.$().post(`${BACKEND_URL}/api/nft_auth/remove`, {
                address: god.currentNetwork.account,
                nft_id
            }).then((data) => {
                if (data.data.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        html: `<p>Connection Removed!</p>`,
                        icon: 'success',
                    });
                    Refresh();
                } else {
                    Swal.fire({
                        title: 'Error',
                        html: `<p>Errors Occured while removing connection.</p>`,
                        icon: 'error',
                    });
                }
            }).catch((err) => {
                Swal.fire({
                    title: 'Error',
                    html: `<p>Errors Occured while removing connection.</p>`,
                    icon: 'error',
                });
            });
        };

        auth.check_auth(
            () => {
                performAction();
            },
            () => {
                Swal.fire({
                    title: 'Error',
                    html: `<p>You need to login to secure miner connection.</p>`,
                    icon: 'error',
                    showCancelButton: true
                }).then((result) => {
                    if (!result.isConfirmed) {
                        // isPendingUptime(false);
                        return;
                    }
                    auth.login(
                        () => {
                            performAction();
                        },
                        () => {
                            Swal.fire({
                                title: 'Error',
                                html: `<p>Errors Occured while login.</p>`,
                                icon: 'error',
                            });
                            // isPendingUptime(false);
                        });
                }).catch(() => {
                    Swal.fire({
                        title: 'Info',
                        html: `<p>Securing Miner Connection has been failed.</p>`,
                        icon: 'info',
                    });
                    // isPendingUptime(false);
                });
            }
        );
    };

    return (
        <Layout>
            <Button
                style={{ marginBottom: '10px' }}
                onClick={onSecureMinerConnection}
                rightIcon={<Send size={18} />}
                sx={{ paddingRight: 12 }}>
                Secure Miner Connection
            </Button>
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
                        {
                            NFTStatus.map((item, index) =>
                                <tr>
                                    <td className={classes.center} key="1">
                                        {item.Miner}
                                    </td>
                                    <td className={`${classes.green} ${classes.center}`} key="2">
                                        <div>
                                            {item.NFT}
                                            {item.Connection === 'Secure' &&
                                                <Button
                                                    onClick={() => onRemoveConnection(item.NFT)}
                                                    className={classes.button}
                                                    variant="white"
                                                    size="xs">
                                                    Remove Connection
                                                </Button>
                                            }
                                        </div>
                                    </td>
                                    <td className={`${classes.green} ${classes.center}`} key="3">
                                        {item.Connection}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </Box>
        </Layout>
    );
});