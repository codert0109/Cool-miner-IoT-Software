import { createStyles } from '@mantine/core';
import WhiteLabel from '../WhiteLabel';
import Box from '../Container/Box';

const useStyles = createStyles((theme) => ({
    secondMargin : {
        marginTop : '10px'
    }
}));

export default function({label}) {
    const { classes } = useStyles();
    return (
        <>
            <Box label={label}>
                <WhiteLabel label="Total Amount" className=""/>
                <WhiteLabel label="USD 12.3456789" className={classes.secondMargin}/>
            </Box>
        </>
    );
}