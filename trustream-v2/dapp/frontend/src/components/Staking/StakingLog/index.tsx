import React, { useState } from 'react';
import { createStyles } from '@mantine/core';
import { Sun, HeartPlus } from 'tabler-icons-react';
import Box from "@/components/Container/Box";
import StakedView from '../../LogBook/StakedView';

const useStyles = createStyles((theme) => ({
    selected : {
        fontWeight : 'bold'
    }
}));

export default function () {
    const [tab, setTab] = useState('Staked');

    
    const { classes } = useStyles();

    return (
        <Box label="Staking Log">
            <StakedView data={StackMockData.data} />
        </Box>
    );
}

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