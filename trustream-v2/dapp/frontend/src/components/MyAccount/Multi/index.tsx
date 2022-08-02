import { createStyles, Button } from '@mantine/core';
import WhiteLabel from '../../WhiteLabel';
import Box from '../../Container/Box';
import LineInfo from './LineInfo';

const useStyles = createStyles((theme) => ({
    textItem: {
        paddingLeft: 10,
        color: 'white',
        width: '100%'
    },
    buttonStyle: {
        // width: '100%',
        height: '30px'
    },
}));

export default function ({ label }) {
    const { classes } = useStyles();
    return (
        <>
            <Box label={label}>
                {/* <span className={classes.textItem}>Elum Balance</span>
                <WhiteLabel label="000,000,000,000" className={classes.secondMargin}/>
                <span className={`${classes.textItem} ${classes.secondMargin}`}>Staked Balance</span>
                <WhiteLabel label="000,000,000,000" className={classes.secondMargin}/> */}
                <div style={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    alignItems : 'center' }}>
                    
                    <LineInfo caption="NFT..............OK" info="X2" className="" />
                    <LineInfo caption="TOKENS......NO" info="__" className="" />
                    <LineInfo caption="TOTAL              " info="X2" className="" />
                    <Button className={classes.buttonStyle} color='orange'>STAKE TOKENS</Button>
                </div>
            </Box>
        </>
    );
}