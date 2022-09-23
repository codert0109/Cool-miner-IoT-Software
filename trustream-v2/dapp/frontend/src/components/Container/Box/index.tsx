import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root : {
        display : 'flex',
        flexDirection : 'column',
        height : '100%'
    },
    header : {
        backgroundColor : (theme.colorScheme == 'dark' ? '#0887BF' : '#26BCFF'),
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
        backgroundColor : theme.colorScheme === 'dark' ? 'black' : '#DBDBDB',
        borderWidth: '0px',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        display : 'flex',
        flexDirection:'column',
        padding : '8px',
        paddingTop : '18px',
        borderRadius : '6px',
        flexGrow : 1
    },
    secondMargin : {
        marginTop : '5px'
    }
}));

export default function({label, children, bodyClass = ''}) {
    const { classes } = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div>{label}</div>
            </div>
            <div className={`${classes.body} ${bodyClass}`}>
                {children}
            </div>
        </div>
    );
}