import React, { useState } from 'react';
import { SegmentedControl, Group, Center, Box, createStyles } from '@mantine/core';
import { Sun, HeartPlus } from 'tabler-icons-react';
import StakedView from './StakedView';
import RewardView from './RewardView';

const useStyles = createStyles((theme) => ({
    selected : {
        fontWeight : 'bold'
    },
    divColor : {
        backgroundColor : theme.colorScheme === 'dark' ? 'transparent' : 'transparent',
        padding : '20px',
        paddingTop : '10px',
        borderRadius : '10px',
        border: '3px solid #DBDBDB'
    }
}));

export default function () {
    const [tab, setTab] = useState('Staked');

    
    const { classes } = useStyles();

    return (
        <div className={classes.divColor}>
            <Group position="center" my="xl">
                <SegmentedControl
                    value={'colorScheme'}
                    onChange={setTab}
                    data={[
                        {
                            value: 'Staked',
                            label: (
                                <Center>
                                    <HeartPlus size={16} />
                                    <Box ml={10} className={tab == 'Staked' ? classes.selected : ''}>Staked</Box>
                                </Center>
                            ),
                        },
                        {
                            value: 'Reward',
                            label: (
                                <Center>
                                    <Sun size={16} />
                                    <Box ml={10} className={tab == 'Reward' ? classes.selected : ''}>Reward</Box>
                                </Center>
                            ),
                        },
                    ]}
                />
            </Group>
            {tab == 'Staked' && <StakedView data={StackMockData.data} />}
            {tab == 'Reward' && <RewardView data={RewardMockData.data}/>}
        </div>
    );
}

const RewardMockData = {
    "data": [
        {
            "title": "Foundation",
            "author": "Isaac Asimov",
            "year": 1951,
            "reviews": {
                "positive": 2223,
                "negative": 259
            }
        },
        {
            "title": "Frankenstein",
            "author": "Mary Shelley",
            "year": 1818,
            "reviews": {
                "positive": 5677,
                "negative": 1265
            }
        },
        {
            "title": "Solaris",
            "author": "Stanislaw Lem",
            "year": 1961,
            "reviews": {
                "positive": 3487,
                "negative": 1845
            }
        },
        {
            "title": "Dune",
            "author": "Frank Herbert",
            "year": 1965,
            "reviews": {
                "positive": 8576,
                "negative": 663
            }
        },
        {
            "title": "The Left Hand of Darkness",
            "author": "Ursula K. Le Guin",
            "year": 1969,
            "reviews": {
                "positive": 6631,
                "negative": 993
            }
        },
        {
            "title": "A Scanner Darkly",
            "author": "Philip K Dick",
            "year": 1977,
            "reviews": {
                "positive": 8124,
                "negative": 1847
            }
        }
    ]
};

const StackMockData = {
    "data": [
        {
            "Date" : "2022.09.19",
            "Amount": 800,
            "NFT" : 1545,
            "Multiplier" : "X 1.4",
            "TimeRemaining" : 44,
            "TotalTime" : 45
        },
        {
            "Date" : "2022.08.15",
            "Amount": 700,
            "NFT" : 8975,
            "Multiplier" : "X 1.7",
            "TimeRemaining" : 54,
            "TotalTime" : 90
        },
        {
            "Date" : "2022.07.12",
            "Amount": 350,
            "NFT" : 6541,
            "Multiplier" : "X 1.7",
            "TimeRemaining" : 20,
            "TotalTime" : 90
        },
        {
            "Date" : "2022.07.05",
            "Amount": 250,
            "NFT" : 2541,
            "Multiplier" : "X 2",
            "TimeRemaining" : 283,
            "TotalTime" : 360
        },
        {
            "Date" : "2022.06.06",
            "Amount": 400,
            "NFT" : 8745,
            "Multiplier" : "X 2",
            "TimeRemaining" : 254,
            "TotalTime" : 360
        }
    ]
};