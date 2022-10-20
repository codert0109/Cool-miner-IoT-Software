import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useInterval } from '@mantine/hooks';
import Box from "@/components/Container/Box";
import WhiteLabel from "@/components/WhiteLabel";
import { Grid } from "@mantine/core";
import { createStyles, Button, Loader } from '@mantine/core';
import { useStore } from '@/store/index';
import join from 'classnames';
import Swal from 'sweetalert2';
import ContractAddress from '../../../contracts/contract-address.json';

import { publicConfig } from 'config/public';
import { formatDecimalWeb3 } from '@/utils/index';
const { TOKEN_UNIT } = publicConfig;

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

  refresh: {
    position: 'absolute',
    top: 6,
    right: 6,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textCenter: {
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    cursor: 'pointer',
    userSelect: 'none'
  },

  gridPadding: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important'
  },

  active: {
    backgroundColor: '#2f9e44',
    color: 'white'
  },

  disable: {
    backgroundColor: 'rgb(93, 109, 255)',
    color: 'white',
    cursor: 'not-allowed',
    pointerEvents: 'none'
  },

  inputtext: {
    backgroundColor: 'white',
    border: 'none',
    outline: 'none',
    width: '100%',
    height: '100%',
    fontFamily: 'Proxima-Nova-Bold!important'
  },

  nowrap: {
    whiteSpace: 'nowrap'
  },

  centerAlign: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    paddingTop: 3
  }
}));

export default observer((props: Props) => {
  const { classes } = useStyles();
  const [amount, setAmount] = useState(0);
  const [prevamount, setPrevAmount] = useState(BigInt(0));
  const { god, stake, token } = useStore();

  const [activePeriod, setActivePeriod] = useState(-1);

  useEffect(() => {
    if (props.amount != undefined) {
      setPrevAmount(props.amount)
    }
    if (props.period != undefined) {
      setActivePeriod(props.period)
    }
  }, [props.amount, props.period]);

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
      return;
    }

    let curIndex = -1;
    stake.stakeTypeList.forEach((item, index) => {
      if (item.period == activePeriod) {
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

    if (props.type != 'edit' && amount == 0) {
      Swal.fire(
        'Info',
        `<p>You need to stake positive number of tokens.</p>`,
        'info'
      );
      return;
    }

    const getConfirmMessage = () => {
      if (props.type == 'edit') {
        if (amount == 0)
          return `<p>You are restaking ${formatDecimalWeb3(prevamount)} tokens for a period of ${stake.stakingTable.period_label[curIndex]}</p>`;
        return `<p>You are restaking ${formatDecimalWeb3(prevamount)} tokens and adding ${amount} tokens for a period of ${stake.stakingTable.period_label[curIndex]}</p>`;
      }
      return `<p>You are staking ${amount} tokens for a period of ${stake.stakingTable.period_label[curIndex]}</p>`;
    };

    Swal.fire({
      title: 'Info',
      html: getConfirmMessage(),
      icon: 'info',
      showCancelButton: true
    }).then((result) => {
      if (!result.isConfirmed) return;

      if (props.onConfirmStart != undefined)
        props.onConfirmStart();

      const stakeTokens = () => {
        stake.stake(curIndex, BigInt(amount) * TOKEN_UNIT)
          .then(async (tx) => {
            const receipt = await tx;
            await receipt.wait();

            Swal.fire(
              'Success',
              `<p>You staked ${parseInt((prevamount / TOKEN_UNIT).toString()) + amount} tokens successfully!</p>`,
              'success'
            );

            token.refresh();
            stake.refresh();
          })
          .catch((err) => {
            Swal.fire(
              'Error',
              `<p>Errors occured while staking</p>`,
              'error'
            );
          });
      };
      
      if (amount > 0) {
        Swal.fire({
          title: 'Info',
          html: `<p>You will need to confirm 2 wallet transactions (depending on blockchain congestion, this could take 5 to 10 seconds per transaction).</p>
                  <ul style="text-align:left;">
                    <li>The first transaction is to allow the staking contract to gain access to the tokens you are staking.</li>
                    <li>The second transaction is be to finalize the token staking transaction and lock up your tokens for the contract period.</li>
                  </ul>`,
          icon: 'info',
          showCancelButton: true
        }).then((result) => {
          if (!result.isConfirmed) return;
          token.allowToken(ContractAddress.ElumStaking, BigInt(amount) * TOKEN_UNIT)
            .then(async (tx) => {
              const receipt = await tx;
              await receipt.wait();
              stakeTokens();
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
          Swal.fire(
            'Error',
            `<p>Errors occured while staking</p>`,
            'error'
          );
        });
      } else {
        stakeTokens();
      }
      
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
    if (stake.stakeTypeList.length == 0) {
      return <Grid.Col md={12} sm={12}>
        <WhiteLabel
          className={join(classes.centerAlign)}
          label={
            <div>
              <Loader size="xs" />
            </div>
          } />
      </Grid.Col>
    }

    const getClassName = (item) => {
      if (activePeriod == item.period)
        return join(classes.textCenter, classes.active)
      if (props.type == 'edit') {
        if (props.period <= item.period)
          return join(classes.textCenter)
        else
          return join(classes.textCenter, classes.disable)
      } else {
        return join(classes.textCenter)
      }
    }
    return stake.stakeTypeList.map((item) =>
      <Grid.Col md={3} sm={3}>
        <WhiteLabel
          className={getClassName(item)}
          onClick={() => onSelectLabel(item.period)} label={item.label} />
      </Grid.Col>
    )
  };

  const getButtonDisableStatus = () => {
    if (props.period != undefined && activePeriod < props.period)
      return true;
    // if (props.amount != undefined && amount < props.amount)
    //   return true;
    return false;
  };

  const mdCols = props.type == 'edit' ? 3 : 4;

  const renderCurrentAmount = () => {
    return (
      <Grid.Col md={mdCols} sm={12}>
        <Grid>
          <Grid.Col md={12} sm={12}>
            <WhiteLabel className={classes.nowrap} label="Current Staked ELUM" />
          </Grid.Col>
          <Grid.Col md={12} sm={12}>
            <WhiteLabel className="" label={formatDecimalWeb3(prevamount)} />
          </Grid.Col>
        </Grid>
      </Grid.Col>
    )
  };


  const renderLabel = () => {
    return props.type == 'edit' ? 'Edit Staking Contract' : "Stake ELUM";
  };

  const renderClose = () => {
    const onClose = () => {
      if (props.onClose != undefined)
        props.onClose();
    };
    return (
      <div className={classes.refresh} onClick={onClose}>
        <span>X</span>
      </div>
    )
  };

  const renderHeader = () => {
    return (
      <>
        {renderLabel()}
        {props.type == 'edit' && renderClose()}
      </>
    );
  };

  return (
    <Box
      label={renderHeader()}
      bodyClass={classes.gridPadding}>
      <Grid style={{ width: '100%' }}>
        {props.type == 'edit' && renderCurrentAmount()}
        <Grid.Col md={mdCols} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className={classes.nowrap} label="Quantity to add to contract" />
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
        <Grid.Col md={mdCols} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Stake Duration" />
            </Grid.Col>
            {renderPeriodList()}
          </Grid>
        </Grid.Col>
        <Grid.Col md={mdCols} sm={12}>
          <Button
            className={classes.button}
            onClick={() => onStaking()}
            color="yellow"
            disabled={getButtonDisableStatus()}
          >
            {props.type == 'edit' ? 'Restake' : 'Stake'}
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
});

interface Props {
  type: string,
  period?: number,
  amount?: bigint,
  onClose?: () => void,
  onConfirmStart?: () => void
}