import React from 'react';
import Box from "@/components/Container/Box";
import StakedView from '../../LogBook/StakedView';

export default function () {
    return (
        <Box label="Staking Status">
            <StakedView/>
        </Box>
    );
}