import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useInterval } from '@mantine/hooks';
import Box from "@/components/Container/Box";
import WhiteLabel from "@/components/WhiteLabel";
import { Grid } from "@mantine/core";
import { createStyles, Button, Progress } from '@mantine/core';
import { useStore } from '@/store/index';
import join from 'classnames';
import Swal from 'sweetalert2';
import ContractAddress from '../../../contracts/contract-address.json';

const useStyles = createStyles((theme) => ({
  button: {
    position: 'relative',
    transition: 'background-color 150ms ease',
    minWidth: '100%',
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    fontSize: '1.5rem'
  },

  progress: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    left: -1,
    top: -1,
    height: 'auto',
    backgroundColor: 'transparent',
    zIndex: 0,
  },

  label: {
    position: 'relative',
    zIndex: 1,
  },

  text: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },

  textCenter: {
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    cursor : 'pointer',
    userSelect : 'none'
  },

  gridPadding: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important'
  },

  active : {
    backgroundColor : '#2f9e44',
    color : 'white'
  },

  inputtext: {
    backgroundColor: 'white',
    border: 'none',
    outline: 'none',
    width: '100%',
    height: '100%',
    fontFamily: 'Proxima-Nova-Bold!important'
  },

  nowrap : {
    whiteSpace : 'nowrap'
  }
}));

export default observer((props: Props) => {
  const { classes, theme } = useStyles();
  const [amount, setAmount] = useState(0);
  const { god, nft, stake, token } = useStore();

  const periodList = [45, 90, 180, 360];
  const [activePeriod, setActivePeriod] = useState(-1);
  const [nftList, setNFTList] = useState([]);

  const [stakeTypeList, setStakeTypeList] = useState([]);

  useEffect(() => {
    if (props.period != undefined) {
      setActivePeriod(props.period)
    }
  }, [props.period]);

  useEffect(() => {
    if (props.amount != undefined) {
      setAmount(props.amount)
    }
  }, [props.amount]);

  const refresh = async () => {
    let stakeTypeList : any = await stake.getStakingList();
    stakeTypeList = stakeTypeList.map((item : any) => {
      return {
        period : parseInt(item.period.toString()),
        id : parseInt(item.id.toString())
      }
    });
    
    setStakeTypeList(stakeTypeList);
  };

  useEffect(() => {
    refresh();
  }, [god.currentNetwork.account]);

  const onInputAmountChange = (e) => {
    if (e.target.value == '')
      setAmount(0);
    else
      setAmount(parseInt(e.target.value));
  };

  const onSelectLabel = (item) => {
    setActivePeriod(item);
  };

  const onStaking = () => {
    if (activePeriod == -1) {
      Swal.fire(
        'Info',
        `<p>You need to choose period to stake.</p>`,
        'info'
      );
    }

    let curIndex = -1;
    
    console.log('stakeTypeList', stakeTypeList, activePeriod, amount);
    stakeTypeList.forEach((item, index) => {
      if (item.period == activePeriod * 86400) {
        curIndex = index;
      }
    });

    if (curIndex == -1) {
      Swal.fire(
        'Info',
        `<p>There is no suitable staking type to satisfy your requirement.</p>`,
        'info'
      );
      return;
    }

    Swal.fire({
      title: 'Info',
      html: `<p>You will stake ${amount} tokens.</p>
             <p>Period: ${stakeTypeList[curIndex].period / 86400} days</p>`,
      icon: 'info',
      showCancelButton: true
    }).then((result) => {
      if (!result.isConfirmed) return;
      token.allowToken(ContractAddress.ElumStaking, amount)
        .then(async (tx) => {
          const receipt = await tx;
          await receipt.wait();

          stake.stake(curIndex, amount)
            .then(async (tx) => {
              const receipt = await tx;
              await receipt.wait();

              Swal.fire(
                'Success',
                `<p>You staked successfully!</p>`,
                'success'
              );
            })
            .catch((err) => {
              Swal.fire(
                'Error',
                `<p>Errors occured while staking</p>`,
                'error'
              );
            });
        })
        .catch((err) => {
          Swal.fire(
            'Error',
            `<p>Errors occured while approving ${amount} tokens to Staking Contract.</p>
             <p>Please check your token balance.</p>`,
            'error'
          );
        });
    }).catch((err) => {
      console.error('staketokens', err);
      Swal.fire(
        'Error',
        `<p>Errors occured while staking</p>`,
        'error'
      );
    });
  };

  const renderPeriodList = () => {
    return periodList.map(item =>             
      <Grid.Col md={3} sm={3}>
        <WhiteLabel 
          className={join(classes.textCenter, activePeriod == item ? classes.active : '')} 
          onClick={() => onSelectLabel(item)} label={item} />
      </Grid.Col>
    )
  };

  const getButtonDisableStatus = () => {
    console.log('period', props.period, activePeriod);
    console.log('amount', props.amount, amount);
    if (props.period != undefined && activePeriod < props.period)
      return true;
    if (props.amount != undefined && amount < props.amount)
      return true;
    return false;
  };

  return (
    <Box label="Stake Tokens" bodyClass={classes.gridPadding}>
      <Grid style={{ width: '100%' }}>
        <Grid.Col md={4} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className={classes.nowrap} label="Amount to Stake" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label={
                <input
                  type="text"
                  placeholder='Input an Number'
                  value={amount}
                  className={classes.inputtext}
                  onChange={onInputAmountChange}></input>
              } />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col md={4} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Stake Duration" />
            </Grid.Col>
            { renderPeriodList() }
          </Grid>
        </Grid.Col>
        <Grid.Col md={4} sm={12}>
          <Button
            className={classes.button}
            onClick={() => onStaking()}
            color="yellow"
            disabled={getButtonDisableStatus()}
          >
            { props.id ? 'Restake' : 'Stake' }
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
});

interface Props { 
  id? : number,
  period? : number,
  amount? : number
}