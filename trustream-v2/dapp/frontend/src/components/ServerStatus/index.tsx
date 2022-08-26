import Box from "../Container/Box";
import { createStyles } from "@mantine/core";
import { useState } from "react";
import WhiteLabel from "../WhiteLabel";

const useStyles = createStyles((theme) => ({
    centerAlign : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        height : '36px'
    },

    imgStyle : {
        height : '60%'
    },

    w100 : {
        width : '100%',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },

    expand : {
        width : 0
    },

    split : {
        marginBottom : 3,
        marginTop : 1
    }
}));

export default function() {
    const { classes, theme } = useStyles();

    const [serverStatus, setServerStatus] = useState([
        { name : 'MQTT',        working : true },
        { name : 'Web3stream',  working : true },
        { name : 'Database',    working : true }
    ]);

    const renderLabel = () => {
        let status = true;
        for (let item of serverStatus) {
            status = status && item.working;
        }

        return (
            <div className={classes.centerAlign}>
                {status === false && <img src="/images/status/stopped.png" className={classes.imgStyle}></img>}
                {status === true && <img src="/images/status/working.png" className={classes.imgStyle}></img>}
                <span>Server Status</span>
            </div>
        )
    };

    const renderElement = (item) => {
        const renderBody = () => {
            return (
                <div className={classes.w100}>
                    <div className={classes.expand} style={{ flexGrow : '1' }}>
                        {item.name}
                    </div>
                    <div>
                        {item.working === false && <img src="/images/status/stopped.png" className={classes.imgStyle}></img>}
                        {item.working === true && <img src="/images/status/working.png" className={classes.imgStyle}></img>}
                    </div>
                </div>
            );
        };

        return (
            <WhiteLabel label={renderBody()} className={classes.split} />
        )
    };
    return (
        <Box label={renderLabel()}>
            {
                serverStatus.map(item => renderElement(item))
            }
        </Box>
    );
}