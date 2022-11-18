import React, { useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from '@/components/Container/Box';
import { Button, createStyles, TextInput } from '@mantine/core';
import { Edit, Eraser } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    marginBottom: 10
  },
  label: {
    color: theme.colorScheme == 'dark' ? 'white' : 'black',
    marginLeft: 10,
    marginRight: 10
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  growdiv: {
    flexGrow: 1,
    width: 0,
    marginLeft: 10,
    marginRight: 10
  },
  btn: {
    paddingLeft: 4,
    paddingRight: 4,
    marginLeft: 4,
    marginRight: 4
  },
  centerdiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default observer((props: Props) => {
  const { classes } = useStyles();
  const [email, setEmail] = useState('');

  // event handlers
  const onEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  return (
    <Box label="Contact Information" rootClass={classes.root}>
      <div className={classes.container}>
        <div className={classes.label}>Your email</div>
        <div className={classes.growdiv}>
          <TextInput size="xs" type="email" value={email} onChange={onEmailChange}></TextInput>
        </div>
        <div className={classes.centerdiv}>
          <Button size="xs" className={classes.btn}>
            <Edit />
          </Button>
        </div>
        <div className={classes.centerdiv}>
          <Button size="xs" className={classes.btn}>
            <Eraser />
          </Button>
        </div>
      </div>
    </Box>
  );
});

interface Props {}
