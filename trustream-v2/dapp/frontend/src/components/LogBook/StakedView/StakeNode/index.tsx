import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { createStyles, Button, Progress, Text, Group, Loader, Modal } from '@mantine/core';
import { useStore } from '@/store/index';
import StakeTokens from '@/components/Staking/StakeTokens';
import { getLocalTimeStringFromSeconds } from '@/utils/index';

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    }
}));

interface Props {
    key: number,
    startTime : number,
    expireTime : number,
    amount : number
}

export default observer((props: Props) => {
    const { classes, theme } = useStyles();
    const { god, stake } = useStore();
    const [stakeTypeList, setStakeTypeList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        stake.refresh();
    }, [god.currentNetwork.account]);

    const timeTotal = props.expireTime - props.startTime;

    const timePast = (Date.now() - props.startTime * 1000) / 1000;
    const timeLeft = timeTotal - timePast;

    const timePastP = timePast * 100 / timeTotal;
    const timeLeftP = 100 - timePastP;

    const onEdit = () => {
        setModalOpen(true);
    };

    const renderMiningLevel = () => {
        if (stake.loading) {
            return (
                <>
                    <td><Loader /></td>
                    <td><Loader /></td>
                    <td><Loader /></td>
                </>
            )
        }

        let cnt = Math.max(1, stake.activeMinerCnt);
        let amount = props.amount / cnt;
        let multiplier = -1;
        let level = "";

        for (let i = 0; i < stake.stakingTable.level.length; i++) {
            for (let j = 0; j < stake.stakingTable.period.length; j++) {
                if (stake.stakingTable.amount[i] > amount)
                    continue;
                if (parseInt(stake.stakingTable.period[i]) * 86400 > props.expireTime - props.startTime)
                    continue;
                if (multiplier == -1 || multiplier < stake.stakingTable.multiplier[i][j]) {
                    multiplier = stake.stakingTable.multiplier[i][j];
                    level = stake.stakingTable.level[i];
                }
            }
        }

        return (
            <>
                <td>{cnt}</td>
                <td>{multiplier}</td>
                <td>{level}</td>
            </>
        )
    };

    return (
        <>
            <Modal
                title={"Restaking"}
                centered
                size="calc(100vw - 87px)"
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3} opened={modalOpen} onClose={function (): void {
                    setModalOpen(false);
                }}
                style={{
                    zIndex : 3000
                }}>
                <StakeTokens 
                    period={(props.expireTime - props.startTime) / 86400} 
                    amount={props.amount}/>
            </Modal>
            <tr key={props.key}>
                <td>
                    {getLocalTimeStringFromSeconds(props.startTime)}
                </td>
                <td style={{ textAlign: 'center' }} >
                    {props.amount}
                </td>
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
                {renderMiningLevel()}
                <td>
                    <Button onClick={() => onEdit()} color='teal' size="xs">
                        Edit | Extend
                    </Button>
                </td>
            </tr>
        </>
    )
});
