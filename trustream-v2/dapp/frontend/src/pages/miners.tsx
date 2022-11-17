import Layout from '@/components/EntireLayout';
import { createStyles, Button, Loader } from '@mantine/core';
import { Send } from 'tabler-icons-react';
import { publicConfig } from '../config/public';
import { useStore } from '../store/index';
import $ from 'axios';
import Swal from 'sweetalert2';
import NFTContractABI from '../contracts/ElumNFT.json';
import ContractAddress from '../contracts/contract-address.json';
import { useEffect, useState } from 'react';
import Box from '@/components/Container/Box';
import { observer } from 'mobx-react-lite';
import NetworkStatus from '@/components/NetworkStatus';
import HistoricalGroup from '@/components/HistoricalGroup';
import { useRouter } from 'next/router';

const { BACKEND_URL } = publicConfig;

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`
    }
  },

  NFTTable: {
    background: 'white',
    color: 'black',
    width: '100%'
  },

  green: {
    color: 'green'
  },

  center: {
    textAlign: 'center'
  },

  button: {
    // color: 'black',
    // borderColor: 'black',
    marginLeft: 10,
    marginRight: 10
  },

  thead: {
    borderBottom: '1px solid black'
  },

  th: {
    borderBottom: '1px solid black'
  },

  btn_th: {
    width: 110
  },

  info: {
    marginBottom: 15
  },

  link: {
    cursor: 'pointer',
    color: 'rgb(190, 190, 255)'
  }
}));

export default observer(() => {
  const { classes } = useStyles();
  const { god, auth, nft } = useStore();

  const router = useRouter();

  const [hasNFT, setHasNFT] = useState(false);
  const [NFTStatus, setNFTStatus] = useState([]);
  const [localConnection, setLocalConnection] = useState(false);

  const Refresh = () => {
    UpdateNFTStatus();
    UpdateLocalMinerInfo();
  };

  useEffect(() => {
    nft.refresh();
    Refresh();
  }, [god.currentNetwork.account]);

  useEffect(() => {
    if (localConnection == false) return;

    let freeNFTID = getDefaultOption();
    if (freeNFTID == '-1') freeNFTID = null;

    let nftCnt = NFTStatus.length;

    if (freeNFTID != null) {
      // if there is a free NFT, we can assign it automatically.
      onSecureMinerConnection(freeNFTID);
    } else {
      if (nftCnt == 0) {
        // We have nothing to do. Anyway we need to show alert messages to users.
      } else {
        // User can replace any miner. We need to show instruction on miners' page.
      }
    }
  }, [localConnection, NFTStatus]);

  const UpdateLocalMinerInfo = () => {
    const url = `${publicConfig.DEVICE_URL}/get_status`;
    $.get(url)
      .then((data) => {
        let info = data.data;
        console.log('message', info);
        if (info.message == 'an error has occured') {
          setLocalConnection(false);
        } else {
          if (info.signature == '') {
            setLocalConnection(true);
          } else {
            auth
              .$()
              .post(`${BACKEND_URL}/api/nft_auth/verifySignature`, {
                signature: info.signature
              })
              .then((data) => {
                if (data.data.status === 'OK') {
                  setLocalConnection(false);
                } else {
                  setLocalConnection(false);
                }
              })
              .catch((err) => {
                console.log('message', err);
                setLocalConnection(true);
              });
          }
        }
      })
      .catch((err) => {
        setLocalConnection(false);
      });
  };

  const UpdateNFTStatus = () => {
    nft
      .getNFTLists()
      .then(async (data) => {
        let info: any = data;
        let curNFTStatus = [];

        for (let i = 0; i < info.length; i++) {
          let item = info[i].toString();
          try {
            let data = await auth.$().post(`${BACKEND_URL}/api/nft_auth/status`, {
              nft_id: item
            });
            let info = data.data.data;
            curNFTStatus.push({
              NFT: info.nft_id,
              Active: info.active,
              // This session is random fake session. Just check if it is null or not.
              Connection: info.session ? 'Assigned' : 'Not assigned'
            });
          } catch (err) {
            curNFTStatus.push({
              NFT: parseInt(item),
              Active: false,
              Connection: 'Not assigned'
            });
          }
        }
        setNFTStatus(curNFTStatus);
      })
      .catch(() => {
        setNFTStatus([]);
      });
  };

  useEffect(() => {
    let timerID = setInterval(() => {
      UpdateLocalMinerInfo();
    }, 2000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const checkNFT = async () => {
    const NFTContractAddress = ContractAddress.ElumNFT;
    try {
      let data = await god.currentNetwork.execContract({
        address: NFTContractAddress,
        abi: NFTContractABI.abi,
        method: 'balanceOf',
        params: [god.currentNetwork.account]
      });
      if (data[0] > 0) return true;
      return false;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    checkNFT()
      .then((data) => {
        setHasNFT(true);
      })
      .catch((err) => {
        setHasNFT(false);
      });
  }, [god.currentNetwork.account]);

  const onSecureMinerConnection = (choosenNFT: string) => {
    if (hasNFT === false) {
      Swal.fire(
        'Error',
        `<p>You do not have an NFT to secure your Mining Connection.</p>
                 <p>Please obtain a mining NFT and try again.</p>
                 <p><a href="/nft/">Buy NFT</a></p>`,
        'warning'
      );
      return;
    }

    if (choosenNFT == null) {
      if (getDefaultOption() != '-1') {
        choosenNFT = getDefaultOption();
      }
    }

    if (choosenNFT == null) {
      Swal.fire('Info', `<p>You need to choose an NFT to secure your Mining Connection.</p>`, 'info');
      return;
    }

    const performAction = () => {
      auth
        .$()
        .post(`${BACKEND_URL}/api/nft_auth/create`, {
          address: god.currentNetwork.account,
          nft_id: choosenNFT
        })
        .then((data) => {
          if (data.data.status == 'success') {
            const url = `${publicConfig.DEVICE_URL}/set_signature`;

            const wallet = god.currentNetwork.account;
            const nftID = choosenNFT;

            const link = data.data.camera.link;
            const location_id = 'P' + (data.data.camera.tableid + 1) + data.data.camera.id;

            $.post(
              url,
              {
                signature: data.data.session,
                nftID,
                wallet,
                link,
                location_id
              },
              {}
            )
              .then((data) => {
                Swal.fire({
                  title: 'Success',
                  html: `<p>Secure Miner Connection Success</p>`,
                  icon: 'success'
                });
                Refresh();
              })
              .catch((err) => {
                // Mining software didn't receive the signature, we need to remove the signature.
                auth
                  .$()
                  .post(`${BACKEND_URL}/api/nft_auth/remove`, {
                    address: god.currentNetwork.account,
                    nft_id: choosenNFT
                  })
                  .then((data) => {
                    Refresh();
                  })
                  .catch((err) => {});
              });
          } else {
            Swal.fire({
              title: 'Error',
              html: `<p>No assignable miners</p>`,
              icon: 'error'
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            html: `<p>Errors occured while securing miner connection</p>`,
            icon: 'error'
          });
        });
    };

    auth.check_auth(
      () => {
        performAction();
      },
      () => {
        auth.login(
          () => {
            performAction();
          },
          () => {
            Swal.fire({
              title: 'Error',
              html: `<p>Errors Occured while login.</p>`,
              icon: 'error'
            });
          }
        );
      }
    );
  };

  const onReplaceConnection = (nft_id) => {
    const performAction = () => {
      auth
        .$()
        .post(`${BACKEND_URL}/api/nft_auth/remove`, {
          address: god.currentNetwork.account,
          nft_id
        })
        .then((data) => {
          if (data.data.status === 'success') {
            onSecureMinerConnection(nft_id);
            // Swal.fire({
            //   title: 'Success',
            //   html: `<p>Connection Removed!</p>`,
            //   icon: 'success'
            // });
          } else {
            Swal.fire({
              title: 'Error',
              html: `<p>Errors Occured while removing connection.</p>`,
              icon: 'error'
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            html: `<p>Errors Occured while removing connection.</p>`,
            icon: 'error'
          });
        });
    };

    auth.check_auth(
      () => {
        performAction();
      },
      () => {
        auth.login(
          () => {
            performAction();
          },
          () => {
            Swal.fire({
              title: 'Error',
              html: `<p>Errors Occured while login.</p>`,
              icon: 'error'
            });
          }
        );
      }
    );
  };

  const renderNFTSelectOptions = () => {
    return NFTStatus.filter((item) => item.Connection == 'Not assigned').map((item) => {
      return {
        value: item.NFT.toString(),
        label: 'NFT ' + item.NFT.toString(),
        group: 'Testnet Miner'
      };
    });
  };

  const getDefaultOption = () => {
    let optionList = renderNFTSelectOptions();
    if (optionList.length == 0) return '-1';
    return optionList[0].value;
  };

  if (nft.loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  // When User has NFT but he has no NFTs to assign
  const hasNFTButNoAssignable = () => {
    return NFTStatus.length > 0 && renderNFTSelectOptions().length == 0;
  };

  const hasNoNFT = () => {
    return NFTStatus.length == 0;
  };

  return (
    <Layout>
      {hasNFTButNoAssignable() && (
        <div className={classes.info}>
          You have no available NFTs to secure a new connection. Click Replace Miner to release your current NFT's signature, or Purchase more NFTs to add more miners.
        </div>
      )}
      {hasNoNFT() && (
        <div className={classes.info}>
          You need an NFT in order to secure your mining connection.&nbsp;
          <span
            className={classes.link}
            onClick={() => {
              router.push('/nft');
            }}
          >
            Click here to buy your NFT
          </span>
        </div>
      )}
      {/* <div style={{ display: 'flex' }}>
        <Select
          placeholder={nft.infoList.length > 0 ? 'Choose NFT to ' : 'No NFTs to assign'}
          data={renderNFTSelectOptions()}
          key={getDefaultOption()}
          defaultValue={getDefaultOption()}
          style={{
            marginRight: 10,
            marginBottom: 10
          }}
          onChange={setSelectedNFT}
        />
        <Button style={{ marginBottom: '10px' }} onClick={onSecureMinerConnection} rightIcon={<Send size={18} />} disabled={localConnection === false} sx={{ paddingRight: 12 }}>
          Secure Connection
        </Button>
      </div> */}

      <Box label="My Miners">
        <table className={classes.NFTTable}>
          <thead className={classes.thead}>
            <tr>
              <th className={classes.th} key="1">
                Miner Status (Updated every 5 minutes)
              </th>
              <th className={classes.th} key="2">
                NFT Status
              </th>
              <th className={classes.th} key="3">
                NFT ID
              </th>
              <th className={`${classes.th} ${classes.btn_th}`} key="4">
                &nbsp;&nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {NFTStatus.length == 0 ? (
              <tr key={0}>
                <td colSpan={4} rowSpan={1} style={{ textAlign: 'center' }}>
                  No miners currently assigned.
                </td>
              </tr>
            ) : (
              NFTStatus.map((item, index) => (
                <tr key={index}>
                  <td className={classes.center} key="1">
                    {item.Active == true ? 'Active' : 'Not Active'}
                  </td>
                  <td className={`${classes.green} ${classes.center}`} key="2">
                    {item.Connection}
                  </td>
                  <td className={`${classes.green} ${classes.center}`} key="3">
                    <div>{item.NFT}</div>
                  </td>
                  <td>
                    <div>
                      {item.Connection === 'Assigned' && (
                        <Button onClick={() => onReplaceConnection(item.NFT)} className={classes.button} disabled={localConnection === false} size="xs">
                          Replace Miner
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Box>

      <NetworkStatus />

      <HistoricalGroup />
    </Layout>
  );
});
