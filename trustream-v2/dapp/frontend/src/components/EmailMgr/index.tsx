import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from '@/components/Container/Box';
import { Button, createStyles, TextInput, Loader } from '@mantine/core';
import { Edit, Eraser } from 'tabler-icons-react';
import { useStore } from '@/store/index';
import Swal from 'sweetalert2';

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
    marginRight: 10,
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center'
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
  },
  w100 : {
    width : '100%'
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

  const updateEmail = (email : string) => {
    profile.saveEmail(email)
    .then((response : any) => {
      if (response.data.status == 'OK') {
        Swal.fire(
          'Success',
          `<p>Updating Email Success</p>`,
          'success'
        )
      } else {
        Swal.fire(
          'Error',
          `<p>Updating Email Failed</p>`,
          'warning'
        )
      }
      profile.refresh();
    })
    .catch((err) => {
      Swal.fire(
        'Error',
        `<p>Updating Email Failed</p>`,
        'warning'
      )
      profile.refresh();
    });
  };

  const onSave = (e) => {
    updateEmail(email);
  };

  const onErase = (e) => {
    updateEmail('');
  };

  return (
    <Box label="Contact Information" rootClass={classes.root}>
      <div className={classes.container}>
        <div className={classes.label}>Your email</div>
        <div className={classes.growdiv}>
          {profile.loading && <Loader size="xs" className={classes.w100} />}
          {!profile.loading && <TextInput size="xs" className={classes.w100} type="email" value={email} onChange={onEmailChange}></TextInput>}
        </div>
        <div className={classes.centerdiv}>
          <Button loading={profile.loading} size="xs" onClick={onSave} className={classes.btn}>
            <Edit/>
          </Button>
        </div>
        <div className={classes.centerdiv}>
          <Button loading={profile.loading} size="xs" onClick={onErase} className={classes.btn}>
            <Eraser/>
          </Button>
        </div>
      </div>
    </Box>
  );
});

interface Props {}
