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
  }
}));

export default observer((props: Props) => {
  const { classes, theme } = useStyles();
  const [amount, setAmount] = useState(0);
  const [activeNFT, setActiveNFT] = useState(-1);
  const { god, nft, stake, token } = useStore();

  const periodList = [45, 90, 180, 360];
  const [activePeriod, setActivePeriod] = useState(-1);
  const [nftList, setNFTList] = useState([]);

  const [stakeTypeList, setStakeTypeList] = useState([]);

  const refresh = async () => {
    let value: any;
    value = await nft.getNFTLists();
    let idList = value.map(item => parseInt(item.toString()));
    setNFTList(idList);

    if (idList.length > 0)
      setActiveNFT(idList[0]);

    let stakeTypeList : any = await stake.getStakingList();
    stakeTypeList = stakeTypeList.map((item : any) => {
      return {
        amount : parseInt(item.amount.toString()),
        period : parseInt(item.period.toString()),
        id : parseInt(item.id.toString()),
        multiplier : parseInt(item.multiplier.toString())
      }
    });
    
    setStakeTypeList(stakeTypeList);
    
    console.log('stakeTypeList', stakeTypeList);
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

  const onInputNFTChange = (e) => {
    if (e.target.value == '')
      setActiveNFT(-1);
    else
      setActiveNFT(parseInt(e.target.value));
  };

  const onSelectLabel = (item) => {
    setActivePeriod(item);
  };

  const onStaking = () => {
    if (activeNFT == -1) {
      Swal.fire(
        'Info',
        `<p>You need to choose NFT to stake.</p>`,
        'info'
      );
      return;
    }
    if (activePeriod == -1) {
      Swal.fire(
        'Info',
        `<p>You need to choose period to stake.</p>`,
        'info'
      );
    }
    if (amount < 500) {
      Swal.fire(
        'Info',
        `<p>You need to stake at most 500 tokens.</p>`,
        'info'
      );
      return;
    }

    let maxIndex = -1;

    console.log('stakeTypeList', stakeTypeList, activePeriod, amount);
    stakeTypeList.forEach((item, index) => {
      if (item.period == activePeriod * 86400 && item.amount <= amount) {
        if (maxIndex == -1 || stakeTypeList[maxIndex].multiplier < item.multiplier)
          maxIndex = index;
      }
    });

    if (maxIndex == -1) {
      Swal.fire(
        'Info',
        `<p>There is no suitable staking type to satisfy your requirement.</p>`,
        'info'
      );
      return;
    }

    Swal.fire({
      title: 'Info',
      html: `<p>You will stake ${stakeTypeList[maxIndex].amount} tokens.</p>
             <p>Period: ${stakeTypeList[maxIndex].period / 86400} days</p>
             <p>Multiplier: ${stakeTypeList[maxIndex].multiplier / 10000}</p>`,
      icon: 'info',
      showCancelButton: true
    }).then((result) => {
      if (!result.isConfirmed) return;
      console.log('token', token);
      token.allowToken(ContractAddress.ElumStaking, stakeTypeList[maxIndex].amount)
        .then(async (tx) => {
          const receipt = await tx;
          await receipt.wait();

          stake.stakeNFT(activeNFT, stakeTypeList[maxIndex].id)
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
            `<p>Errors occured while approving ${stakeTypeList[maxIndex].amount} tokens to Staking Contract.</p>
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

  const renderNFTSelect = () => {
    return (
      <select
        placeholder='Input an Number'
        value={activeNFT}
        className={classes.inputtext}
        onChange={onInputNFTChange}>
        {
          nftList.map(item => <option value={item}>{item}</option>)
        }
      </select>
    );
  };

  const renderNFTSelectWrapper = () => {
    return (
      <WhiteLabel className="" label={
        renderNFTSelect()
      } />
    );
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

  return (
    <Box label="Stake Tokens" bodyClass={classes.gridPadding}>
      <Grid style={{ width: '100%' }}>
        <Grid.Col lg={3} md={6} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Amount to Stake" />
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
        <Grid.Col lg={3} md={6} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="NFT id" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              {nftList.length == 0 && <WhiteLabel className={classes.text} label="You need to buy a NFT." />}
              {nftList.length > 0 && renderNFTSelectWrapper()}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col lg={3} md={6} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Stake Duration" />
            </Grid.Col>

            { renderPeriodList() }
          </Grid>
        </Grid.Col>
        <Grid.Col lg={3} md={6} sm={12}>
          <Button
            className={classes.button}
            onClick={() => onStaking()}
            color="yellow"
          >
            Stake
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
});

interface Props { }