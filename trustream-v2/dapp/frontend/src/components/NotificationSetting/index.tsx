import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from '@/components/Container/Box';
import { Button, createStyles, Switch, TextInput } from '@mantine/core';
import { Edit, Eraser } from 'tabler-icons-react';
import { useStore } from '@/store/index';

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
  const { god, auth, profile } = useStore();

  const [setting, setSetting] = useState([
    {
      label: 'Alert when Miner has been offline for 1 hr',
      value: true
    },
    {
      label: 'Alert when Miner has been offline for 1 day',
      value: true
    },
    {
      label: 'Alert when Miner has been offline for 1 week',
      value: true
    },
    {
      label: 'Alert when Miner has been offline for 1 month',
      value: true
    },
  ]);

  useEffect(() => {
    let decodeSetting : any = {};

    try {
      let info = JSON.parse(profile.setting);
      let keys = Object.keys(info);

      keys.forEach(key => {
        decodeSetting[info[key].label] = info[key].value;
      });
    } catch (err) {
      decodeSetting = {};
    }

    let updateSetting = [...setting];

    setting.forEach((item, index) => {
      try {
        let value = decodeSetting[item.label];
        if (value == false) {
          updateSetting[index].value = false;
        } else {
          updateSetting[index].value = true;
        }
      } catch (err) {
        updateSetting[index].value = true;
      }
    });

    setSetting(updateSetting);
  }, [profile.setting]);

  // useEffect(() => {
  //   auth.check_auth(() => {
  //     profile.refresh();
  //   }, () => {
  //     auth.login(() => {
  //       profile.refresh();
  //     }, () => {
        
  //     });
  //   });
  // }, [god.currentNetwork.account]);

  const onSettingUpdate = (label, value) => {
    let updateSetting = [...setting];

    let filterData = updateSetting.filter(item => item.label == label);
    if (filterData.length == 0) {
      return;
    } else {
      filterData[0].value = value;
    }

    setSetting(updateSetting);
    profile.saveSetting(updateSetting);
  };

  const renderBody = () => {
    return setting.map((item, index) => {
      return (
        <div key={index} className={classes.container}>
          <div className={classes.growdiv}>{item.label}</div>
          <div className={classes.centerdiv}>
            <Switch onChange={(e) => onSettingUpdate(item.label, e.currentTarget.checked)}size="md" onLabel="ON" offLabel="OFF" checked={item.value} />
          </div>
        </div>
      );
    });
  };

  return <Box label="Notification Settings">{renderBody()}</Box>;
});

interface Props {}
