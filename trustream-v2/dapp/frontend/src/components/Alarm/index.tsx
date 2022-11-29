import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { createStyles } from '@mantine/core';
import { AlertTriangle, ArrowBarToRight, ArrowBarToLeft } from 'tabler-icons-react';
import { useStore } from '@/store/index';

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
      width: '100%',
      paddingLeft: 5,
      paddingRight: 5
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
      marginTop : 10
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

  const onAlarmClick = () => {
    alert.toggleOpen();
  };

  useEffect(() => {
    alert.refresh();
  }, [god.currentNetwork.account]);


  const renderAlertNode = ({color, caption, imgurl, opened, message, submessage}) => {
    return (
      <div className={classes.root} style={{backgroundColor: color}} onClick={() => onAlarmClick()}>
        <div className={classes.header}>
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
                    {/* Miner has been <span className={classes.red}>offline</span> for <span className={classes.red}>1 week</span>, */}
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

  const renderMinerAlert = () => {
    if (alert.hasAlert == false || alert.visible == false) 
      return <></>
    return renderAlertNode({
      color : 'rgb(255, 102, 0)',
      caption : 'Miner Alert',
      imgurl : '/images/alert/computer.png',
      opened : alert.opened,
      message : alert.getAlert().message,
      submessage : alert.getAlert().submessage
    })
  };

  const MAIN_NET = 4689;
  const TEST_NET = 4690;
  
  const renderNetworkAlert = () => {
    console.log('chainId', god.currentChain.chainId, 'visible', alert.visible);
    if (god.currentChain.chainId == TEST_NET || alert.visible == false) {
      return <></>
    } else {
      console.log('tries to render');
      return renderAlertNode({
        color : 'rgb(149, 159, 1)',
        caption : 'Network Alert',
        imgurl : 'https://logo.chainbit.xyz/iotx',
        opened : alert.opened,
        message : 'You are not in the IoTex testnet.',
        submessage : undefined
      })
    }
  };

  console.log('called again');

  return (
    <div className={classes.group_root}>
      {renderMinerAlert()}
      {renderNetworkAlert()}
    </div>
  );
});

interface Props { }
