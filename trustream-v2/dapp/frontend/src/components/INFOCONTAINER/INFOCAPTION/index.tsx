import {createStyles} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    style : {
        width : 36,
        border : '0px',
        fontWeight : 'bold',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    textstyle : {
        color : 'white',
        borderTopRightRadius : 6,
        borderBottomRightRadius : 6,
        backgroundColor : (theme.colorScheme == 'dark' ? '#0887BF' : '#26BCFF'),
        writingMode: 'vertical-lr',
        transform: 'rotate(180deg)',
        paddingTop : 20,
        paddingBottom : 20,
        width : '100%',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    }
}));

export default function({caption}) {
    const { classes } = useStyles();

    return (
        <div className={classes.style}>
            <span className={classes.textstyle}>{caption}</span>
        </div>
    );
};