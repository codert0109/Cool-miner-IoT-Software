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
        <Box label="Staking Status">
            <StakedView/>
        </Box>
    );
}