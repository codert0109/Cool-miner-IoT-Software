import { createStyles } from '@mantine/core';

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
        height : '36px'
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

export default function({label, children}) {
    const { classes } = useStyles();
    return (
        <>
            <div className={classes.header}>
                <div>{label}</div>
            </div>
            <div className={classes.body}>
                {children}
            </div>
        </>
    );
}