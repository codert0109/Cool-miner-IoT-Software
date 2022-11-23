import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from '@/components/Container/Box';
import { Button, createStyles, TextInput } from '@mantine/core';
import { Edit, Eraser } from 'tabler-icons-react';
import { useStore } from '@/store/index';

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
  const { god, auth, profile } = useStore();

  useEffect(() => {
    auth.check_auth(() => {
      profile.refresh();
    }, () => {
      auth.login(() => {
        profile.refresh();
      }, () => {
        
      });
    });
  }, [god.currentNetwork.account]);

  useEffect(() => {
    setEmail(profile.email);
  }, [profile.email]);

  // event handlers
  const onEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onSave = (e) => {
    profile.saveEmail(email);
  };

  const onErase = (e) => {
    profile.saveEmail('');
  };

  return (
    <Box label="Contact Information" rootClass={classes.root}>
      <div className={classes.container}>
        <div className={classes.label}>Your email</div>
        <div className={classes.growdiv}>
          <TextInput size="xs" type="email" value={email} onChange={onEmailChange}></TextInput>
        </div>
        <div className={classes.centerdiv}>
          <Button size="xs" onClick={onSave} className={classes.btn}>
            <Edit />
          </Button>
        </div>
        <div className={classes.centerdiv}>
          <Button size="xs" onClick={onErase} className={classes.btn}>
            <Eraser />
          </Button>
        </div>
      </div>
    </Box>
  );
});

interface Props {}
