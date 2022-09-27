import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { createStyles, Table, Button, Progress, Anchor, Text, Group, ScrollArea, Box } from '@mantine/core';
import { useStore } from '@/store/index';

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    }
}));

interface Props {
    id: number,
    key: number
}

interface StakeInfo {
    type_id: number,
    startTime: string;
    amount: Number,
    staker: string;
}

export default observer((props: Props) => {
    const { classes, theme } = useStyles();

    const { god, nft, stake, token } = useStore();
    const [stakeTypeList, setStakeTypeList] = useState([]);
    const [stakeInfo, setStakeInfo] = useState<StakeInfo>(null);

    const refresh = async () => {
        let stakeTypeList: any = await stake.getStakingList();
        stakeTypeList = stakeTypeList.map((item: any) => {
            return {
                amount: parseInt(item.amount.toString()),
                period: parseInt(item.period.toString()),
                id: parseInt(item.id.toString()),
                multiplier: parseInt(item.multiplier.toString())
            }
        });

        setStakeTypeList(stakeTypeList);

        let stakeInfo: any = await stake.getStakingInfo(props.id);

        if (stakeInfo == null) {
            setStakeInfo(null);
        } else {
            setStakeInfo({
                type_id: stakeInfo.type_id,
                startTime: new Date(parseInt(stakeInfo.startTime.toString()) * 1000).toLocaleString(),
                amount: parseInt(stakeInfo.amount.toString()),
                staker: stakeInfo.staker
            });
        }
    };

    useEffect(() => {
        refresh();
    }, [god.currentNetwork.account, props.id]);

    if (stakeInfo == null || stakeInfo.type_id == undefined) {
        return (
            <></>
        );
    }

    const timeTotal = stakeTypeList[stakeInfo.type_id].period;

    console.log('timeTotal', timeTotal);
    const timePast = (Date.now() - Date.parse(stakeInfo.startTime)) / 1000;
    const timeLeft = timeTotal - timePast;

    const timePastP = timePast * 100 / timeTotal;
    const timeLeftP = 100 - timePastP;

    return (
        <tr key={props.key}>
            <td>
                {stakeInfo.startTime}
            </td>
            <td style={{ textAlign: 'center' }} >
                {stakeInfo.amount}
            </td>
            <td>{Intl.NumberFormat().format(props.id)}</td>
            <td>
                <Group position="apart">
                    <Text size="xs" color="teal" weight={700}>
                        {(timePast / 86400).toFixed(0)}days passed
                    </Text>
                    <Text size="xs" color="red" weight={700}>
                        {(timeLeft / 86400).toFixed(0)}days left
                    </Text>
                </Group>
                <Progress
                    classNames={{ bar: classes.progressBar }}
                    sections={[
                        {
                            value: timePastP,
                            color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
                        },
                        {
                            value: timeLeftP,
                            color: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
                        },
                    ]}
                />
            </td>
            <td>{`X ${stakeTypeList[stakeInfo.type_id].multiplier / 10000}`}</td>
            <td><Button color='teal' size="xs">Edit</Button></td>
        </tr>
    )
});
