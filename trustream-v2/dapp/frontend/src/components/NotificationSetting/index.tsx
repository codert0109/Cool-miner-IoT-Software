import React, { useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from '@/components/Container/Box';
import { Button, createStyles, Switch, TextInput } from '@mantine/core';
import { Edit, Eraser } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 5
  },
  growdiv: {
    flexGrow: 1,
    width: 0,
    marginLeft: 10,
    marginRight: 10,
    color: theme.colorScheme == 'dark' ? 'white' : 'black'
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

  const [setting, setSetting] = useState([
    {
      label: 'Alert when you have been offline for 1 hour',
      value: true
    },
    {
      label: 'Alert when you have been offline for 24 hrs',
      value: true
    },
    {
      label: 'Alert when you have been offline for 1 week, again a different message',
      value: false
    },
    {
      label: 'Alert when you can get more rewards if you stake',
      value: false
    },
    {
      label: 'Alert when x amount of rewards available to claim',
      value: true
    }
  ]);

  const renderBody = () => {
    return setting.map((item, index) => {
      return (
        <div key={index} className={classes.container}>
          <div className={classes.growdiv}>{item.label}</div>
          <div className={classes.centerdiv}>
            <Switch size="md" onLabel="ON" offLabel="OFF" defaultChecked={item.value} />
          </div>
        </div>
      );
    });
  };

  return <Box label="Notification Settings">{renderBody()}</Box>;
});

interface Props {}
