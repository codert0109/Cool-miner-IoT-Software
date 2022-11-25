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
      padding: 5
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
      height: '100%'
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
    root: {
      position: 'fixed',
      right: 0,
      top: 50,
      color: 'white',
      zIndex: 1000,
      backgroundColor: 'rgb(255, 102, 0)',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      cursor: 'pointer',
      userSelect: 'none',
      fontWeight: 'bold',
      borderRadius: 3
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

  if (alert.hasAlert == false || alert.visible == false) {
    return <></>
  }

  return (
    <div className={classes.root} onClick={() => onAlarmClick()}>
      <div className={classes.header}>
        <div>
          <div className={cx(classes.center, classes.btn)}>{alert.opened == true ? <ArrowBarToRight size="24" /> : <ArrowBarToLeft size="24" />}</div>
        </div>
        <div className={classes.flexgrow}>
          <AlertTriangle size="24" className={classes.alertIcon} />
          {alert.opened && <div>Alert</div>}
        </div>
      </div>
      {alert.opened && (
        <div className={classes.body}>
          <div className={classes.bodyinner}>
            <div className={classes.bodyimg}>
              <img src="/images/alert/computer.png" className={classes.body_rimg} />
            </div>
            <div className={classes.textdiv}>
              <div>
                <b>
                  {alert.getAlert().message}
                  {/* Miner has been <span className={classes.red}>offline</span> for <span className={classes.red}>1 week</span>, */}
                </b>
              </div>
              {alert.getAlert().submessage != '' && <div>
                <b>
                  {alert.getAlert().submessage}
                </b>
              </div> }
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

interface Props {}
