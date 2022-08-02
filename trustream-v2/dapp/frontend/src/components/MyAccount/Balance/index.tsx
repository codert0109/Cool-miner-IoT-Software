import { createStyles, Button } from '@mantine/core';
import WhiteLabel from '../../WhiteLabel';
import Box from '../../Container/Box';

const useStyles = createStyles((theme) => ({
    secondMargin : {
        marginTop : '10px'
    },
    textItem : {
        paddingLeft : 10,
        color : 'white',
        width : '100%'
    },
    buttonStyle: {
        marginLeft : 'auto !important',
        marginRight : 'auto !important',
        width: 'fit-content',
        height : '30px'
    },
}));

export default function({label}) {
    const { classes } = useStyles();
    return (
        <Box label={label}>
            <div style={{flexGrow : 1, display: 'flex', flexDirection : 'column', justifyContent : 'space-between'}}>
                <span className={classes.textItem}>Elum Balance</span>
                <WhiteLabel label="000,000,000,000" className=""/>
                <span className={classes.textItem}>Staked Balance</span>
                <WhiteLabel label="000,000,000,000" className=""/>
                <Button className={classes.buttonStyle} color='orange'>
                    STAKE
                </Button>
            </div>
        </Box>
    );
}