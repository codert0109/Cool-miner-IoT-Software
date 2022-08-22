import BalanceComponent from "./Balance";
import MultiComponent from "./Multi";
import ClaimComponent from "./Claim";
import { createStyles, Grid } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    style : {
        display : 'flex'
    }
}));

export default function() {
    const {classes} = useStyles();
    return (
        <Grid>
            <Grid.Col md={3}><BalanceComponent label="BALANCE"/></Grid.Col>
            <Grid.Col md={3}><MultiComponent label="MULTIPLIER"/></Grid.Col>
            <Grid.Col md={6}><ClaimComponent label="UNCLAIMED BALANCE"/></Grid.Col>
        </Grid>
    );
}