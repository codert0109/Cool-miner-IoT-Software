import Layout from "@/components/EntireLayout";
import { createStyles, Button, ScrollArea } from '@mantine/core';
import { Send } from 'tabler-icons-react';
import { publicConfig } from "../config/public";
import { useStore } from '../store/index';
import $ from "axios";
import Swal from 'sweetalert2';
import NFTContractABI from '../contracts/ElumNFT.json';
import ContractAddress from '../contracts/contract-address.json';
import { useEffect, useState } from "react";
import Box from "@/components/Container/Box";
import { getNFTIDFromAddress } from "../utils";
import { observer } from 'mobx-react-lite';
import { Select } from '@mantine/core';

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
        // color: 'black',
        // borderColor: 'black',
        marginLeft: 10,
        marginRight: 10
    },

    thead: {
        borderBottom: '1px solid black'
    },

    th: {
        borderBottom: '1px solid black'
    },

    btn_th: {
        width: 110
    }
}));

export default observer(() => {
    const { classes } = useStyles();
    const { god, auth, nft } = useStore();

    const [hasNFT, setHasNFT] = useState(false);
    const [NFTLists, setNFTLists] = useState([]);
    const [NFTStatus, setNFTStatus] = useState([]);
    const [minerName, setMinerName] = useState('');
    const [minerSession, setMinerSession] = useState('');
    const [selectedNFT, setSelectedNFT] = useState<string | null>(null);

    useEffect(() => {
        nft.refresh();
    }, [god.currentNetwork.account]);

    const UpdateLocalMinerInfo = () => {
        const url = `${publicConfig.DEVICE_URL}/get_status`;

        $.get(url)
            .then((data) => {
                let info = data.data;
                if (info.message == 'an error has occured') {
                    setMinerName('');
                    setMinerSession('');
                } else {
                    auth.$().post(`${BACKEND_URL}/api/nft_auth/verifySignature`, {
                        signature: info.signature
                    }).then((data) => {
                        if (data.data.status === 'OK') {
                            setMinerName('');
                            setMinerSession('');
                        } else {
                            setMinerName(info.miner);
                            setMinerSession(info.signature);
                        }
                    }).catch((err) => {
                        setMinerName(info.miner);
                        setMinerSession(info.signature);
                    });
                }
            })
            .catch((err) => {
                setMinerName('');
                setMinerSession('');
            });
    };

    const UpdateNFTStatus = () => {
        nft.getNFTLists()
            .then((data) => {
                let info: any = data;
                setNFTLists(info);
                let curNFTStatus = [];
                info.forEach(item => {
                    curNFTStatus.push({
                        NFT: parseInt(item.toString()),
                        Miner: 'Loading',
                        Connection: 'Loading'
                    });
                });

                setNFTStatus((e) => curNFTStatus);

                info.forEach(item => {
                    auth.$().post(`${BACKEND_URL}/api/nft_auth/status`, {
                        nft_id: item.toString()
                    }).then((data) => {
                        let info = data.data.data;
                        if (info.session) {
                            setNFTStatus([{
                                NFT: info.nft_id,
                                Miner: info.miner ? info.miner : 'Not set',
                                // This session is random fake session. Just check if it is null or not.
                                Connection: info.session ? 'Assigned' : 'Not assigned'
                            }]);
                        } else {
                            setNFTStatus([]);
                        }
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
        UpdateLocalMinerInfo();
    };

    useEffect(() => {
        UpdateLocalMinerInfo();
    }, [god.currentNetwork.account]);

    useEffect(() => {
        let timerID = setInterval(() => {
            UpdateLocalMinerInfo();
        }, 2000);
        return () => {
            clearInterval(timerID);
        };
    }, []);

    useEffect(() => {
        UpdateNFTStatus();
    }, [god.currentNetwork.account]);

    const checkNFT = async () => {
        const NFTContractAddress = ContractAddress.ElumNFT;
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

        if (selectedNFT == null) {
            Swal.fire(
                'Info',
                `<p>You need to choose an NFT to secure your Mining Connection.</p>`,
                'info'
            )
            return;
        }

        const performAction = () => {
            auth.$().post(`${BACKEND_URL}/api/nft_auth/create`, {
                address: god.currentNetwork.account,
                nft_id: selectedNFT,
                miner: minerName // we should upgrade this one
            }).then((data) => {
                Swal.fire({
                    title: 'Success',
                    html: `<p>Secure Miner Connection Success</p>`,
                    icon: 'success',
                });
                Refresh();

                const url = `${publicConfig.DEVICE_URL}/set_signature`;

                const wallet = god.currentNetwork.account;
                const nftID = getNFTIDFromAddress(wallet);

                $.post(url, { signature: data.data.session, nftID, wallet }, {

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
                        });
                }).catch(() => {
                    Swal.fire({
                        title: 'Info',
                        html: `<p>Securing Miner Connection has been failed.</p>`,
                        icon: 'info',
                    });
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

    if (nft.loading) {
        return (
            <Layout></Layout>
        )
    }

    const renderNFTSelectOptions = () => {
        return nft.infoList.map((item, index) => {
            return {
                value : nft.idList[index].toString(),
                label : "NFT " + nft.idList[index].toString(),
                group : 'Testnet Miner'
            }
        });
    };

    return (
        <Layout>
            <div style={{display : 'flex'}}>
                <Select
                    placeholder={nft.infoList.length > 0 ? "Choose NFT to Mine" : "No NFTs to assign"}
                    data={renderNFTSelectOptions()}
                    style={{
                        marginRight : 10
                    }}
                    onChange={setSelectedNFT}
                />

                <Button
                    style={{ marginBottom: '10px' }}
                    onClick={onSecureMinerConnection}
                    rightIcon={<Send size={18} />}
                    disabled={minerName === ''}
                    sx={{ paddingRight: 12 }}>
                    {minerName !== '' ? `Secure ${minerName} Connection` : `Secure Connection`}
                </Button>
            </div>


            <Box label="My Miners">
                <table className={classes.NFTTable}>
                    <thead className={classes.thead}>
                        <tr>
                            <th className={classes.th} key="1">Miner Name</th>
                            <th className={classes.th} key="2">NFT Status</th>
                            <th className={classes.th} key="3">NFT ID</th>
                            <th className={`${classes.th} ${classes.btn_th}`} key="4">&nbsp;&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            NFTStatus.length == 0 ?
                                <tr key={0}>
                                    <td colSpan={4} rowSpan={1} style={{ textAlign: 'center' }}>
                                        No miners currently assigned.
                                    </td>
                                </tr>
                                : NFTStatus.map((item, index) =>
                                    <tr key={index}>
                                        <td className={classes.center} key="1">
                                            {item.Miner}
                                        </td>
                                        <td className={`${classes.green} ${classes.center}`} key="2">
                                            {item.Connection}
                                        </td>
                                        <td className={`${classes.green} ${classes.center}`} key="3">
                                            <div>
                                                {item.NFT}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {item.Connection === 'Assigned' &&
                                                    <Button
                                                        onClick={() => onRemoveConnection(item.NFT)}
                                                        className={classes.button}
                                                        // variant="white"
                                                        size="xs">
                                                        Remove Miner
                                                    </Button>
                                                }
                                            </div>
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