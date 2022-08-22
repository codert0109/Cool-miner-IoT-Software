import StatusElum from '@/components/StatusElum';
import WhiteLabel from '@/components/WhiteLabel';
import { Button, createStyles, Grid } from '@mantine/core';
import Box from '../../Container/Box';

const useStyles = createStyles((theme) => ({
    parentStyle: {
        padding: 20,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    buttonStyle: {
        width: '100%',
        height : '30px'
    },
    padding10: {
        paddingLeft: 10
    },
    spliter: {
        height: 10,
        flexGrow: 1
    },
    imgStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    }
}));

export default function ({label}) {
    const { classes, theme } = useStyles();

    return (
        <Box label={label}>
            <div className={classes.parentStyle}>
                <div>
                    <Grid>
                        <Grid.Col xs={3}>
                            <div className={classes.imgStyle}>
                                {theme.colorScheme == 'dark' && <img src="images\logo\White-Square-E-75px.png" style={{ width: '70%' }}></img>}
                                {theme.colorScheme == 'light' && <img src="images\logo\Black-Square-E-75px.png" style={{ width: '70%' }}></img>}
                            </div>
                        </Grid.Col>
                        <Grid.Col xs={9}>
                            <StatusElum />
                        </Grid.Col>
                    </Grid>

                </div>
                <div className={classes.spliter}></div>
                <div>
                    <Grid>
                        <Grid.Col xs={6}>
                            <WhiteLabel label="000,000,000,000" className="" />
                        </Grid.Col>
                        <Grid.Col xs={6}>
                            <Button className={classes.buttonStyle} color='green'>CLAIM</Button>
                        </Grid.Col>
                    </Grid>
                </div>
            </div>
        </Box>
    );
};