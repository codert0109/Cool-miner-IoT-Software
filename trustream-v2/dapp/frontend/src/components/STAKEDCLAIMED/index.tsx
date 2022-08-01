import { createStyles } from '@mantine/core';
import WhiteLabel from '../WhiteLabel';

const useStyles = createStyles((theme) => ({
    header : {
        backgroundColor : '#0887BF',
        border : '0px',
        borderRadius : '6px',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        display : 'flex',
        fontWeight : 'bold',
        // fontSize : '1.3em',
        zIndex : 100,
        position : 'relative',
        height : '42px'
    },
    body : {
        marginTop : '-8px',
        backgroundColor : 'black',
        borderWidth: '0px',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        display : 'flex',
        flexDirection:'column',
        padding : '10px',
        paddingTop : '18px',
        borderRadius : '6px'
    },
    secondMargin : {
        marginTop : '5px'
    }
}));

export default function({label}) {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.header}>
                <div>{label}</div>
            </div>
            <div className={classes.body}>
                <WhiteLabel label="Total Amount" className=""/>
                <WhiteLabel label="USD 32000000" className={classes.secondMargin}/>
            </div>
        </>
    );
}