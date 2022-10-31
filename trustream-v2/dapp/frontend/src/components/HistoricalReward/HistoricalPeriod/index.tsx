import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button, createStyles } from '@mantine/core';
import WhiteLabel from '@/components/WhiteLabel';


const useStyles = createStyles((theme) => ({
    header : {
        color : 'white',
        backgroundColor : 'rgb(106, 106, 106)',
        fontSize : '.9rem',
        textAlign : 'center',
        marginBottom : 2,
        whiteSpace : 'nowrap'
    },

    elum : {
        fontSize : '.9rem',
        textAlign : 'center',
        marginTop : 2,
        whiteSpace : 'nowrap'
    }
}));


export default observer((props: Props) => {
  const { classes } = useStyles();

  return (
    <div>
        <WhiteLabel label={props.label} className={classes.header}></WhiteLabel>
        <WhiteLabel label={props.token} className={classes.elum}></WhiteLabel>
    </div>
  );
});

interface Props {
    label : string;
    token : string;
}