import React, { useEffect } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button } from '@mantine/core';
import { useStore } from '../../store/index';

interface Props { }

export default observer((props: Props) => {
    const { god, auth, nft } = useStore();

    const store = useLocalObservable(() => ({
        NFTLists: 0,
        setNFTLists(NFTLists) {
            this.NFTLists = NFTLists;
        }
    }));

    useEffect(() => {

    }, [god.currentNetwork.account]);

    return (
        <Box>
        </Box>
    );
});
