import { createStyles, Button, Modal } from '@mantine/core';
import Swal from 'sweetalert2'
import React, {useState} from "react";

const BREAKPOINT = '@media (max-width: 900px)';

const useStyles = createStyles((theme) => ({
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

export default function ({ title, imgurl, price, comment, disabled = false, callback = null, text = ""}) {
    const { classes, theme } = useStyles();
    const [ modalOpen, setModalOpen ] = useState(false);

    const onBuy = (e) => {
        callback();
        e.stopPropagation();
    };

    const onView = () => {
        if (text !== "") {
            Swal.fire(
                'Not ready yet',
                text,
                'info'
            )
        } else {
            setModalOpen(true);
        }
    };

    const renderMinerNode = () => {
        return (
            <div className={classes.node} onClick={onView}>
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
                        <Button disabled={disabled} onClick={onBuy} className={classes.buybtn}>
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

            {renderMinerNode()}
        </>

    );
}