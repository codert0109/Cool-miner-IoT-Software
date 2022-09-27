import React, { useState, useEffect } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import Box from "@/components/Container/Box";
import { createStyles, Grid, Button, NumberInput } from '@mantine/core';
import WhiteLabel from "@/components/WhiteLabel";
import { useStore } from '../../store/index';
import Swal from 'sweetalert2';

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
    fontFamily : 'Proxima-Nova-Bold!important'
  }
}));

export default observer((props: Props) => {
  const { god, token } = useStore();
  const { classes } = useStyles();
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  const refresh = async () => {
    let value: number;
    value = await token.getPrice();
    value /= Math.pow(10, 18);
    setPrice(value);
  };

  useEffect(() => {
    refresh();
  }, []);

  const onInputChange = (e) => {
    if (e.target.value == '')
      setAmount(0);
    else
      setAmount(parseInt(e.target.value));
  };

  const onBuy = () => {
    if (amount == 0) {
      Swal.fire(
        'Info',
        `<p>Please input a positive number to buy tokens.</p>`,
        'info'
      );
    } else {
      const value = BigInt(amount) * BigInt(price * Math.pow(10, 18));
      token.buy(amount, value.toString())
        .then(async (tx) => {
          const receipt = await tx;
          await receipt.wait();
          Swal.fire(
            'Success',
            `<p>You bought ${amount} tokens successfully.</p>`,
            'success'
          );
        })
        .catch((err) => {
          console.log('error', err);
          Swal.fire(
            'Error',
            `<p>Errors occured while processing</p>`,
            'error'
          );
        });
    }
  };

  return (
    <Box label="Buy ELUM Tokens" bodyClass={classes.gridPadding}>
      <Grid style={{ width: '100%' }}>
        <Grid.Col md={4} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Token Amount" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label={
                <input
                  type="text"
                  placeholder='Input an Number'
                  value={amount}
                  className={classes.inputtext}
                  onChange={onInputChange}></input>
              } />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col md={4} sm={12}>
          <Grid>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label="Price" />
            </Grid.Col>
            <Grid.Col md={12} sm={12}>
              <WhiteLabel className="" label={`${price} IOTX`} />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col md={4} sm={12}>
          <Button
            color='green'
            size="xs"
            className={classes.button}
            onClick={() => onBuy()}>Buy</Button>

        </Grid.Col>
      </Grid>
    </Box>
  );
});

interface Props { }