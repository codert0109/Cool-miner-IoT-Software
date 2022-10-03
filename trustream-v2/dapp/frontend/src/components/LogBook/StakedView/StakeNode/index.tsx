import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { createStyles, Button, Progress, Text, Group, Loader, Modal } from '@mantine/core';
import { useStore } from '@/store/index';
import StakeTokens from '@/components/Staking/StakeTokens';
import { formatTime, getLocalTimeStringFromSeconds } from '@/utils/index';
import Swal from 'sweetalert2';

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    },
    expired: {
        color: 'red'
    }
}));

interface Props { }

export default observer((props: Props) => {
    const { classes, theme } = useStyles();
    const { stake, token } = useStore();
    const [modalOpen, setModalOpen] = useState(false);

    const [timePast, setTimePast] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [timePastP, setTimePastP] = useState(0);
    const [timeLeftP, setTimeLeftP] = useState(0);

    useEffect(() => { // visual effect
        const timerID = setInterval(() => {
            if (stake.loading)
                return;

            const _timeTotal = stake.stakedInfo.expireTime - stake.stakedInfo.startTime;

            let _timePast = stake.timestamp() - stake.stakedInfo.startTime;

            if (_timePast < 0)
                _timePast = 0;
            else if (_timePast > _timeTotal)
                _timePast = _timeTotal;

            const _timeLeft = _timeTotal - _timePast;
            const _timePastP = _timePast * 100 / Math.max(1, _timeTotal);
            const _timeLeftP = 100 - _timePastP;

            setTimePast(_timePast);
            setTimeLeft(_timeLeft);
            setTimePastP(_timePastP);
            setTimeLeftP(_timeLeftP);

        }, 1000);
        return () => {
            clearInterval(timerID);
        }
    }, []);

    const onEdit = () => {
        setModalOpen(true);
    };

    const onRestake = () => {
        stake.stakeTypeList
        const period = stake.stakedInfo.expireTime - stake.stakedInfo.startTime;

        let curIndex = -1;
        stake.stakeTypeList.forEach((item, index) => {
            if (item.period <= period) {
                if (curIndex == -1 || stake.stakeTypeList[curIndex].period < item.period) {
                    curIndex = index;
                }
            }
        });

        if (curIndex == -1) {
            Swal.fire(
                'Info',
                `<p>There is no available staking type for you.</p>`,
                'info'
            );
            return;
        }

        Swal.fire({
            title: 'Info',
            html: `<p>You are restaking ${stake.stakedInfo.amount} tokens for a period of ${stake.getStakingLabel()}</p>`,
            icon: 'info',
            showCancelButton: true
        }).then((result) => {
            if (!result.isConfirmed) return;
            stake.stake(curIndex, 0)
                .then(async (tx) => {
                    const receipt = await tx;
                    await receipt.wait();

                    Swal.fire(
                        'Success',
                        `<p>You restaked tokens successfully!</p>`,
                        'success'
                    );

                    token.refresh();
                    stake.refresh();
                })
                .catch((err) => {
                    Swal.fire(
                        'Error',
                        `<p>Errors occured while staking</p>`,
                        'error'
                    );
                });
        }).catch((err) => {
            console.error('staketokens', err);
            Swal.fire(
                'Error',
                `<p>Errors occured while staking</p>`,
                'error'
            );
        });
    };

    const onWithDraw = () => {
        stake.withdrawStaker()
            .then(async (tx) => {
                const receipt = await tx;
                await receipt.wait();

                Swal.fire(
                    'Success',
                    `<p>Your ELUM tokens have been transferred to your wallet successfully!</p>`,
                    'success'
                );

                stake.refresh();
                token.refresh();
            })
            .catch((err) => {
                Swal.fire(
                    'Error',
                    `<p>Errors occured while withDraw tokens</p>`,
                    'error'
                );
            });
    };

    const renderMiningLevel = () => {
        if (stake.loading) {
            return (
                <>
                    <td><Loader size="sm" /></td>
                    <td><Loader size="sm" /></td>
                    <td><Loader size="sm" /></td>
                </>
            )
        }

        if (stake.stakingStatus() == stake.STAKING_STATUS.EXPIRED) {
            return (
                <>
                    <td>{stake.activeMinerCnt}</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </>
            )
        }

        let cnt = Math.max(1, stake.activeMinerCnt);

        let amount = stake.stakedInfo.amount / cnt;
        let multiplier = -1;
        let level = "";

        for (let i = 0; i < stake.stakingTable.level.length; i++) {
            for (let j = 0; j < stake.stakingTable.period.length; j++) {
                if (stake.stakingTable.amount[i] > amount)
                    continue;
                if (stake.stakingTable.period[j] > stake.stakedInfo.expireTime - stake.stakedInfo.startTime)
                    continue;
                if (multiplier == -1 || multiplier < stake.stakingTable.multiplier[i][j]) {
                    multiplier = stake.stakingTable.multiplier[i][j];
                    level = stake.stakingTable.level[i];
                }
            }
        }

        return (
            <>
                <td>{stake.activeMinerCnt}</td>
                <td>{multiplier == -1 ? 'X 1.0' : `X ${multiplier / 10000}`}</td>
                <td>{level == '' ? 'No level' : level}</td>
            </>
        )
    };

    const renderDate = () => {
        if (stake.loading) {
            return (
                <Loader size="sm" />
            );
        }
        if (stake.stakingStatus() == stake.STAKING_STATUS.EXPIRED) {
            return (
                <span className={classes.expired}>Expired</span>
            )
        }
        return (
            getLocalTimeStringFromSeconds(stake.stakedInfo.startTime)
        );
    };

    const renderPeriod = () => {
        if (stake.loading) {
            return (
                <Loader size="sm" />
            );
        }

        if (stake.stakingStatus() == stake.STAKING_STATUS.EXPIRED) {
            return (
                <Button onClick={() => onWithDraw()} color="orange" size="xs">
                    Withdraw your ELUM
                </Button>
            );
        }

        return (
            <div style={{overflow : 'hidden'}}>
                <Group position="apart">
                    <Text size="xs" color="rgb(0, 141, 19)" weight={800}>
                        {formatTime(timePast)} passed
                    </Text>
                    <Text size="xs" color="rgb(255, 1, 1)" weight={800}>
                        {formatTime(timeLeft)} left
                    </Text>
                </Group>
                <Progress
                    classNames={{ bar: classes.progressBar }}
                    sections={[
                        {
                            value: timePastP,
                            color: 'rgb(0, 141, 19)',
                        },
                        {
                            value: timeLeftP,
                            color: 'rgb(255, 1, 1)',
                        },
                    ]}
                />
            </div>
        )
    };

    const renderButton = () => {
        if (stake.loading)
            return <Loader size="sm" />;
        if (stake.stakingStatus() == stake.STAKING_STATUS.STAKING) {
            return (
                <Button onClick={() => onEdit()} color='teal' size="xs">
                    Edit | Extend
                </Button>
            )
        } else {
            return (
                <Button onClick={() => onRestake()} color='green' size="xs">
                    Restake
                </Button>
            )
        }
    };

    return (
        <>
            <Modal
                centered
                size="calc(100vw - 87px)"
                padding={0}
                withCloseButton={false}
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0}
                overlayBlur={3} 
                opened={modalOpen} 
                onClose={function (): void {
                    setModalOpen(false);
                }}
                style={{
                    zIndex: 3000
                }}>
                <StakeTokens
                    type="edit"
                    onClose={() => {
                        setModalOpen(false)
                    }}
                    onConfirmStart={function(): void{
                        setModalOpen(false);
                    }}
                    period={stake.stakedInfo.expireTime - stake.stakedInfo.startTime}
                    amount={stake.stakedInfo.amount} />
            </Modal>
            <tr key={0}>
                <td>
                    {renderDate()}
                </td>
                <td style={{ textAlign: 'center' }} >
                    {stake.loading ? <Loader size="sm" /> : stake.stakedInfo.amount}
                </td>
                <td>
                    {renderPeriod()}
                </td>
                {renderMiningLevel()}
                <td>
                    {renderButton()}
                </td>
            </tr>
        </>
    )
});
