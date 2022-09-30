import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import WhiteLabel from "@/components/WhiteLabel";
import { createStyles, Loader, Grid } from '@mantine/core';
import { useStore } from '../../../store/index';
import { formatMultiplier, formatTime } from '@/utils/index';

const useStyles = createStyles((theme) => ({
    textAlign: {
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'center',
        marginTop: 1,
        marginBottom: 1
    },
    center_container: {
        height: 24,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 15
    },
    p : {
        marginTop : 1,
        marginBottom : 1
    }
}));

// This will be interact with backend server.
export default observer((props: Props) => {
    const { classes } = useStyles();
    const { god, stake } = useStore();

    useEffect(() => {
        stake.refresh();
    }, [god.currentNetwork.account]);

    const renderElementWithLoader = (element) => {
        if (stake.loading) {
            return (
                <div className={classes.center_container}>
                    <Loader size={18} />
                </div>
            )
        }
        return element;
    };

    const renderHead = () => {
        return (
            <WhiteLabel label={
                renderElementWithLoader(
                    <Grid columns={70}>
                        <Grid.Col span={13}>
                            Level
                        </Grid.Col>
                        <Grid.Col span={17}>
                            Token Required
                        </Grid.Col>
                        <Grid.Col span={10}>
                            {stake.stakingTable.period_label[0]}
                        </Grid.Col>
                        <Grid.Col span={10}>
                            {stake.stakingTable.period_label[1]}
                        </Grid.Col>
                        <Grid.Col span={10}>
                            {stake.stakingTable.period_label[2]}
                        </Grid.Col>
                        <Grid.Col span={10}>
                            {stake.stakingTable.period_label[3]}
                        </Grid.Col>
                    </Grid>
                )
            } className={classes.textAlign} />
        )
    };

    const renderBody = () => {
        return stake.stakingTable.level.map((curLabel, index) => {
            return (
                <WhiteLabel label={
                    renderElementWithLoader(
                        <Grid grow={false} columns={70}>
                            <Grid.Col span={13}>
                                {curLabel}
                            </Grid.Col>
                            <Grid.Col span={17}>
                                {stake.stakingTable.amount[index]}
                            </Grid.Col>
                            <Grid.Col span={10}>
                                {formatMultiplier(stake.stakingTable.multiplier[index][0])}
                            </Grid.Col>
                            <Grid.Col span={10}>
                                {formatMultiplier(stake.stakingTable.multiplier[index][1])}
                            </Grid.Col>
                            <Grid.Col span={10}>
                                {formatMultiplier(stake.stakingTable.multiplier[index][2])}
                            </Grid.Col>
                            <Grid.Col span={10}>
                                {formatMultiplier(stake.stakingTable.multiplier[index][3])}
                            </Grid.Col>
                        </Grid>
                    )
                } className={classes.textAlign} />
            )
        });
    };

    const renderTable = () => {
        // if (stake.stakingTable.period.length != 4)
        //     return <></>
        return (
            <>
                {renderHead()}
                {renderBody()}
            </>
        )
    };

    return (
        <Grid>
            <Grid.Col sm={12} md={12}>
                <Box label="Staked Token Multipliers">
                    {renderTable()}
                </Box>
            </Grid.Col>
            <Grid.Col sm={12} md={12}>
                <WhiteLabel label={
                    <>
                        <p className={classes.p}>Staked tokens are divided by the number of active miners to calculate multipliers</p>
                        <p className={classes.p}>2000 tokens staked for 360 with 1 miner = 1.85x multiplier,</p>
                        <p className={classes.p}>if there are 2 miners, 1.55x multiplier.</p>
                    </>
                } className={classes.textAlign}/>
            </Grid.Col>
        </Grid>
    );
});

interface Props { }
