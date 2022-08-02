import WhiteLabel from '@/components/WhiteLabel';
import { createStyles, Grid } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    secondMargin : {
        marginTop : '10px'
    }
}));

export default function({caption, info, className}) {
    const { classes } = useStyles();
    return (
        <Grid style={{width : '100%'}} className={className}>
            <Grid.Col xs={8} style={{color : 'white'}}>
                {caption}
            </Grid.Col>
            <Grid.Col xs={4}>
                <WhiteLabel className="" label={info}/>
            </Grid.Col>
        </Grid>
    );
}