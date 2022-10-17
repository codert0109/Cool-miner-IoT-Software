import { createStyles, Modal, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import ContractAddress from '../../../contracts/contract-address.json';
import { useStore } from '../../../store/index';
import { getContractAddressFormat } from "../../../utils";
import Swal from 'sweetalert2'

const BREAKPOINT = '@media (max-width: 900px)';

const useStyles = createStyles((theme) => ({
    success: {
        // border: '2px solid #00A170',
        // borderLeft: '5px solid #00A170',
    },

    textinfo: {
        marginLeft: 10,
        fontSize: '0.9rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    infodiv: {
        padding: 5,
        paddingLeft: 0,
        marginTop: 10,
        marginLeft: 10,
        fontSize: '1.2rem',
        marginBottom: 10,
        cursor: 'pointer',
        height: 40,
        display: 'flex',
        alignItems: 'center',
    },
    node: {
        paddingLeft: 10,
        paddingRight: 10,
        cursor: 'pointer'
    },

    header: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },

    info: {
        paddingTop: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // height: 50
    },
    info_text: {
        width: '100%',
        fontSize: '0.9rem',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        [BREAKPOINT]: {
            fontSize: '0.7rem',
            lineHeight: 1.2
        }
    },
    imgtext: {
        position: 'absolute',
        left: 0,
        top: 0
    },
    imgdiv: {
        position: 'relative'
    },
    buybtn: {
        minHeight: '100%',
        maxHeight: '100%'
    },
    text_right_align: {
        textAlign: 'right'
    },
    transfer_div: {
        textAlign: 'center',
        width: '100%',
        display: 'flex'
    },
    textinput: {
        width: 0,
        flexGrow: 1
    }
}));

export default function NFTStatus({ title, imgurl, price, acquiredTime, id }) {
    const { god, nft } = useStore();
    const { classes, theme } = useStyles();
    const [modalOpen, setModalOpen] = useState(false);
    const [transferAddress, setTransferAddress] = useState('');

    const getAcquiredTime = () => {
        let timeStamp = parseInt(acquiredTime.toString());
        if (timeStamp == 0) return;
        let info = new Date(timeStamp * 1000);
        return info.getFullYear() + " " + (info.getMonth() + 1) + " " + info.getDate();
    };

    const onTransferNFT = async () => {
        const tx = nft.transferNFT(id, transferAddress);
        console.log({id, transferAddress});

        try {
            const receipt : any = await tx;
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
                setModalOpen(false);
                nft.refresh();
            }
        } catch (error) {
            console.error(error);
            const ERROR_CODE_TX_REJECTED_BY_USER = 4001;
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                Swal.fire(
                    'Error!',
                    'You rejected transaction.',
                    'error'
                )
            } else {
                Swal.fire(
                    'Error!',
                    error.reason,
                    'error'
                )
            }
        }
    };

    const renderMinerNode = (isDetailShow = false) => {
        return (
            <div className={classes.node}>
                {isDetailShow === false && <div><p className={classes.header}>{title}</p></div>}
                <div className={classes.imgdiv}>
                    <img src={imgurl} width="100%"></img>
                    {/* <div className={classes.imgtext}>{text}</div> */}
                </div>
                <div className={classes.info}>
                    {
                        isDetailShow === true &&
                        <div className={classes.info_text}>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>Contract Address</td>
                                        <td className={classes.text_right_align}>{getContractAddressFormat()}</td>
                                    </tr>
                                    <tr>
                                        <td>Token ID</td>
                                        <td className={classes.text_right_align}>{id}</td>
                                    </tr>
                                    <tr>
                                        <td>Token Standard</td>
                                        <td className={classes.text_right_align}>ERC-721</td>
                                    </tr>
                                    <tr>
                                        <td>Blockchain</td>
                                        <td className={classes.text_right_align}>IoTeX_Testnet</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className={classes.transfer_div}>
                                                <div style={{ marginRight: 10 }} >
                                                    <Button onClick={() => onTransferNFT()} size="xs">
                                                        Transfer your NFT
                                                    </Button>
                                                </div>
                                                <div className={classes.textinput}>
                                                    <TextInput
                                                        placeholder="0x..."
                                                        size="xs"
                                                        value={transferAddress}
                                                        onChange={
                                                            (event) => {
                                                                setTransferAddress(event.currentTarget.value)
                                                            }
                                                        }>
                                                    </TextInput>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        );
    }

    return (
        <>
            <Modal
                title={title}
                centered
                size="sm"
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3} opened={modalOpen} onClose={function (): void {
                    setModalOpen(false);
                }}>
                {renderMinerNode(true)}
            </Modal>


            <div className={classes.infodiv + ' ' + classes.success} onClick={() => setModalOpen(true)}>
                <img style={{ height: "100%" }} src="/images/nft/TestNet.png"></img>
                <span className={classes.textinfo}>
                    <span>Testnet Miner </span>
                    | <span style={{ whiteSpace: 'nowrap' }}>contract address {ContractAddress.ElumNFT} </span>
                    | <span style={{ whiteSpace: 'nowrap' }}>acquired on {getAcquiredTime()}</span>
                </span>
            </div>
        </>
    );
}