import { createStyles, Modal, Button } from "@mantine/core";
import { useState } from "react";
import NFTMinerNode from "..";

const BREAKPOINT = '@media (max-width: 900px)';

const useStyles = createStyles((theme) => ({
    infodiv: {
        padding: 5,
        paddingLeft: 10,
        marginTop: 10,
        marginLeft: 10,
        fontSize: '1.2rem',
        marginBottom: 20,
        cursor: 'pointer',
        height: 50,
        display : 'flex',
        alignItems : 'center'
    },

    warning: {
        border: '2px solid #0072B5',
        borderLeft: '5px solid #0072B5',
    },

    success: {
        border: '2px solid #00A170',
        borderLeft: '5px solid #00A170',
    },

    textinfo: {
        marginLeft: 10
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
    }
}));

export default function ({ nftStatus, title, imgurl, price, comment}) {
    const { classes, theme } = useStyles();
    const [modalOpen, setModalOpen] = useState(false);

    if (nftStatus == true) {
        const renderMinerNode = () => {
            return (
                <div className={classes.node}>
                    <div><p className={classes.header}>{title}</p></div>
                    <div className={classes.imgdiv}>
                        <img src={imgurl} width="100%"></img>
                        {/* <div className={classes.imgtext}>{text}</div> */}
                    </div>
                    <div className={classes.info}>
                        <div className={classes.info_text}>
                            <div>Price {price}</div>
                            <div>{comment}</div>
                        </div>
                        <div>
                            <Button disabled={true} className={classes.buybtn}>
                                BUY
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <>
                <Modal
                    centered
                    size="sm"
                    overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                    overlayOpacity={0.55}
                    overlayBlur={3} opened={modalOpen} onClose={function (): void {
                        setModalOpen(false);
                    }}>
                    {renderMinerNode()}
                </Modal>
                <div className={classes.infodiv + ' ' + classes.success} onClick={() => setModalOpen(true)}>
                    <img style={{ height: "100%" }} src="/images/nft/TestNet.png"></img>
                    <span className={classes.textinfo}>You have been purchased NFT.</span>
                </div>
            </>
        );
    } else {
        return (
            <div className={classes.infodiv + ' ' + classes.warning}>
                You need to buy NFT in order to mine.
            </div>
        );
    }


}