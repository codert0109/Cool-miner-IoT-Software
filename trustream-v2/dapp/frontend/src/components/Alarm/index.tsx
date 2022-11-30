import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { createStyles } from '@mantine/core';
import { AlertTriangle, ArrowBarToRight, ArrowBarToLeft } from 'tabler-icons-react';
import { useStore } from '@/store/index';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    body: {
      backgroundColor: 'black',
      padding: 5,
      width : '100%'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 5,
      paddingRight: 5
    },
    header100: {
      width: '100%',
    },
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    body_rimg: {
      // height: '100%',
      width : 50,
      height : 47
    },
    flexgrow: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    bodyinner: {
      display: 'flex',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'white',
      color: 'black',
      fontFamily: 'Timew New Roman',
      padding: 5
    },
    red: {
      color: 'red'
    },
    orange: {
      color: 'rgb(255, 153, 0)'
    },
    textdiv: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    bodyimg: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 6
    },
    group_root : {
      position: 'fixed',
      right: 0,
      top: 50,
      zIndex: 1000,
      display : 'flex',
      flexDirection : 'column',
      alignItems : 'flex-end'
    },

    root: {
      color: 'white',
      // backgroundColor: 'rgb(255, 102, 0)',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      cursor: 'pointer',
      userSelect: 'none',
      fontWeight: 'bold',
      borderRadius: 3,
      marginTop : 10,
    },
    root100 : {
      width : '100%'
    },
    root_unopen : {
      width : 60,
      // float : 'right'
    },
    alertIcon: {
      ref: icon,
      color: 'white',
      marginRight: 6
    },
    btn: {
      marginRight: 6,
      height: 28
    }
  };
});

export default observer((props: Props) => {
  const { classes, cx } = useStyles();
  const { god, auth, nft, profile, alert } = useStore();

  const router = useRouter();

  // const onAlarmClick = () => {
  //   alert.toggleOpen();
  // };

  useEffect(() => {
    console.log('alert refresh called');
    alert.refresh();
  }, [god.currentNetwork.account]);

  const onAlarmClick = (index) => {
    let link = alert.getAlert()[index].link;
    if (link != '') {
      router.push(link);
      if (link == '/profile') {
        alert.setLoadEmailAlert();
      }
    } else {
      alert.toggleOpen(index);
    }
  };

  const renderAlertNode = ({color, caption, imgurl, opened, message, submessage}, index) => {
    return (
      <div className={opened ? cx(classes.root, classes.root100) : cx(classes.root, classes.root_unopen)} style={{backgroundColor: color}} onClick={() => onAlarmClick(index)}>
        <div className={opened ? cx(classes.header, classes.header100) : classes.header}>
          <div>
            <div className={cx(classes.center, classes.btn)}>{opened == true ? <ArrowBarToRight size="24" /> : <ArrowBarToLeft size="24" />}</div>
          </div>
          <div className={classes.flexgrow}>
            <AlertTriangle size="24" className={classes.alertIcon} />
            {opened && <div>{caption}</div>}
          </div>
        </div>
        {opened && (
          <div className={classes.body}>
            <div className={classes.bodyinner}>
              <div className={classes.bodyimg}>
                <img src={imgurl} className={classes.body_rimg} />
              </div>
              <div className={classes.textdiv}>
                <div>
                  <b>
                    {message}
                  </b>
                </div>
                {submessage != '' && <div>
                  <b>
                    {submessage}
                  </b>
                </div>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const MAIN_NET = 4689;
  const TEST_NET = 4690;

  useEffect(() => {
    if (god.currentChain.chainId == TEST_NET) {
      alert.removeAlert('network')
    } else {
      alert.addAlert({
        type : 'network',
        color : 'rgb(149, 159, 1)',
        caption : 'Network Alert',
        imgurl : 'https://logo.chainbit.xyz/iotx',
        opened : true,
        message : 'You are not in the IoTex testnet.',
        submessage : 'Please switch the networks',
        link : ''
      }, true);
      alert.visible = true;
    }
  }, [god.currentChain.chainId]);

  if (alert.getAlert() == null || alert.visible == false) {
    return <></>
  }

  return (
    <div className={classes.group_root}>
      {alert.getAlert().map((item, index) => renderAlertNode(item, index))}
    </div>
  );
});

interface Props { }
