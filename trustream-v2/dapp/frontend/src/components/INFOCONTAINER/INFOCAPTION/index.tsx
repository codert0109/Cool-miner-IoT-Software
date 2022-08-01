import {createStyles} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    style : {
        width : 36,
        border : '0px',
        backgroundColor: '#0887BF',
        color : 'white',
        fontWeight : 'bold',
        borderTopLeftRadius : 15,
        borderBottomLeftRadius : 15,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',

        marginTop : 20,
        marginBottom : 20
    },
    textstyle : {
        writingMode: 'vertical-lr',
        transform: 'rotate(180deg)',
        paddingTop : 10,
        paddingBottom : 10
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