import React, { useState, useEffect } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import { createStyles, Grid, Button, NumberInput, Loader } from '@mantine/core';
import WhiteLabel from "@/components/WhiteLabel";
import { useStore } from '../../store/index';
import Swal from 'sweetalert2';
import join from 'classnames';

const useStyles = createStyles((theme) => ({
  gridPadding: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important'
  },
  price: {
    color: '#2f9e44'
  },
  button: {
    width: '100%',
    fontSize: '1.5rem',
    height: '100%',
  },
  inputtext: {
    backgroundColor: 'white',
    border: 'none',
    outline: 'none',
    width: '100%',
    height: '100%',
    fontFamily: 'Proxima-Nova-Bold!important',
    textAlign: 'center'
  },
  vertcenter: {
    alignItems: 'center'
  },
  center_container: {
    height: 24,
    display: 'flex',
    alignItems: 'center'
  },
  textcenter: {
    textAlign: 'center',
    whiteSpace: 'nowrap'
  }
}));

export default observer((props: Props) => {
  const { god, token } = useStore();
  const { classes } = useStyles();
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');

  // useEffect(() => {
  //   token.refresh();
  // }, [god.currentNetwork.account]);

  const onInputChange = (e) => {
    if (e.target.value == '')
      setAmount(0);
    else
      setAmount(parseInt(e.target.value));
  };

  const onInputAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const onTransfer = () => {
    if (amount <= 0) {
      Swal.fire(
        'Info',
        `<p>Please input a positive number to transfer tokens.</p>`,
        'info'
      );
    } else {
      token.transfer(address, amount)
        .then(async (tx) => {
          const receipt = await tx;
          await receipt.wait();
          Swal.fire(
            'Success',
            `<p>Token transfered successfully!</p>`,
            'success'
          )
        })
        .catch((err) => {
          Swal.fire(
            'Error',
            `<p>Errors occured while transfering</p>`,
            'error'
          )
        });
    }
  };

  const renderElementWithLoader = (element) => {
    if (token.loading) {
      return (
        <div className={classes.center_container}>
          <Loader size={18} />
        </div>
      )
    }
    return element;
  };

  return (
    <Box label="Transfer ELUM" bodyClass={classes.gridPadding}>
      <Grid style={{ width: '100%' }}>
        <Grid.Col md={4} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className={classes.textcenter} label="Wallet address" />
            </Grid.Col>
            <Grid.Col md={12} sm={12} style={{ paddingTop: 0 }}>
              <WhiteLabel className={classes.vertcenter} label={
                renderElementWithLoader(
                  <input
                    type="text"
                    placeholder='0x...'
                    value={address}
                    className={classes.inputtext}
                    onChange={onInputAddressChange}></input>
                )
              } />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col md={4} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className={classes.textcenter} label="Amount" />
            </Grid.Col>
            <Grid.Col md={12} sm={12} style={{ paddingTop: 0 }}>
              <WhiteLabel className={classes.textcenter} label={
                renderElementWithLoader(
                  <input
                    type="text"
                    placeholder='Input an Number'
                    value={amount}
                    className={classes.inputtext}
                    onChange={onInputChange}></input>
                )
              } />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col md={4} sm={12}>
          <Button
            color='orange'
            size="xs"
            className={classes.button}
            disabled={token.loading}
            onClick={() => onTransfer()}>Transfer</Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
});

interface Props { }