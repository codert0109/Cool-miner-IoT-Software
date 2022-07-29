import { Oval } from 'react-loader-spinner'
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    Loader: {
        position : 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)'
    }
}));

export default function() {
    const { classes } = useStyles();

    return (
        <div className={classes.Loader}>
            <Oval 
                color="#00BFFF" 
                height={40} 
                width={40} 
                strokeWidth={7}
                />
        </div>
    );
};