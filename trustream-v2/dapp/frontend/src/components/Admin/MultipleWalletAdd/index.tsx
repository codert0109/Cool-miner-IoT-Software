import React, { useState } from 'react';
import { useStore } from '@/store/index';

import {
  createStyles,
  Textarea,
  Button,
  Loader
} from '@mantine/core';

import Swal from 'sweetalert2'
import { getAddressFormat } from '../../../utils';

import NFTContractABI from '../../../contracts/ElumNFT.json';
import ContractAddress from '../../../contracts/contract-address.json';


const BREAKPOINT = '@media (max-width: 900px)';

const useStyles = createStyles((theme) => ({
  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,
    fontFamily: 'Consolas !important',

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },
  gridDivBtn: {
    marginTop: '16px',
    width: '50%',
    float: 'right',
    [BREAKPOINT]: {
      width: '100%'
    }
  },
  loader: {
    marginRight: '10px'
  }
}));

export default function () {
  const { classes, theme } = useStyles();
  const [pending, isPending] = useState(false);
  const [walletLists, setWalletLists] = useState('');
  const { god, lang } = useStore();

  const placeholder = '0x5D7f87B9ceA4D4B8ede546494277d0822F5BCB8E\n0xF20986e93AeE8f60A4B49231Da8056052C62B47e\n';

  const isWalletFormat = (address: string) => {
    if (address.length <= 2) return false;
    if (address.substring(0, 2) !== '0x') return false;
    if (address.length > 42) return false;

    const chars = "0123456789ABCDEFX";

    address = address.toUpperCase();

    for (let i = 0; i < address.length; i++) {
      if (chars.indexOf(address[i]) === -1) {
        return false;
      }
    }

    return true;
  }

  const addWalletAddress = (addressList) => {
    const NFTContractAddress = ContractAddress.ElumNFT;
    isPending(true);
    god.currentNetwork.execContract({
      address: NFTContractAddress,
      abi: NFTContractABI.abi,
      method: 'affectWhiteList',
      params: [addressList, true]
    }).then(async (tx) => {
      const receipt = await tx;
      await receipt.wait();
      Swal.fire(
        'Success',
        `${addressList.length} wallets added to beta tester lists successfully!`,
        'success'
      )
      isPending(false);
    }).catch((error) => {
      const ERROR_CODE_TX_REJECTED_BY_USER = 4001;
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        Swal.fire(
          'Info',
          'You rejected transaction.',
          'info'
        )
      } else {
        Swal.fire(
          'Error!',
          error.reason,
          'error'
        )
      }
      isPending(false);
    });

  };

  const onNewTesterAdd = () => {
    let prv_addressList = walletLists.split('\n');

    let addressList = [];
    for (let i = 0; i < prv_addressList.length; i++) {
      if (isWalletFormat(prv_addressList[i])) {
        addressList.push(prv_addressList[i]);
      }
    }

    if (addressList.length === 0) {
      Swal.fire(
        'Error!',
        'No wallet address detected',
        'error'
      );
      return;
    } else {
      const walletAddressRender = () => {
        let str = '<div style="height:100px;overflow:auto;font-family:\'Consolas\'">';
        let index = 0;
        for (let item of addressList) {
          ++index;
          str += `<div>${index}. ${getAddressFormat(item)}</div>`;
        }
        str += '</div>';
        return str;
      };

      Swal.fire({
        title: 'info',
        html: `<p>Detected ${addressList.length} wallets.</p>
               ${walletAddressRender()}`,
        icon: 'info',
        showCancelButton: true,
      }).then((result) => {
        if (!result.isConfirmed)
          return;
        addWalletAddress(addressList);
      });
      return;
    }
  };

  return (
    <>
      <Textarea
        label="Multiple Add"
        placeholder={placeholder}
        minRows={4}
        mt="md"
        onChange={
          (event) => {
            setWalletLists(event.currentTarget.value)
          }
        }

        classNames={{ input: classes.input }}
      />
      <Button disabled={pending} className={classes.gridDivBtn} onClick={onNewTesterAdd}>
        {pending && <Loader size="xs" className={classes.loader} />}
        Add To BetaTester Lists
      </Button>
    </>
  );
}