import React, { useEffect, useState } from 'react';
import { createStyles, Table, Button, Progress, Anchor, Text, Group, ScrollArea, Box } from '@mantine/core';
import WhiteLabel from "@/components/WhiteLabel";
import { useLocalObservable, observer } from 'mobx-react-lite';
import { useStore } from '@/store/index';
import StakeNode from './StakeNode';

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
  }
}));

interface TableReviewsProps {
  data: {
    Date: string,
    Amount: number,
    NFT: number,
    Multiplier: string,
    TimeRemaining: number,
    TotalTime: number
  }[];
}


const tableData: TableReviewsProps = {
  "data": [
    {
      "Date": "2022.09.19",
      "Amount": 800,
      "NFT": 1545,
      "Multiplier": "X 1.4",
      "TimeRemaining": 44,
      "TotalTime": 45
    },
    {
      "Date": "2022.08.15",
      "Amount": 700,
      "NFT": 8975,
      "Multiplier": "X 1.7",
      "TimeRemaining": 54,
      "TotalTime": 90
    },
    {
      "Date": "2022.07.12",
      "Amount": 350,
      "NFT": 6541,
      "Multiplier": "X 1.7",
      "TimeRemaining": 20,
      "TotalTime": 90
    },
    {
      "Date": "2022.07.05",
      "Amount": 250,
      "NFT": 2541,
      "Multiplier": "X 2",
      "TimeRemaining": 283,
      "TotalTime": 360
    },
    {
      "Date": "2022.06.06",
      "Amount": 400,
      "NFT": 8745,
      "Multiplier": "X 2",
      "TimeRemaining": 254,
      "TotalTime": 360
    }
  ]
};

interface Props { }

export default observer((props: Props) => {
  const { classes, theme } = useStyles();
  const { god, nft, stake, token } = useStore();

  const [nftList, setNFTList] = useState([]);

  const refresh = async () => {
    let value: any;
    value = await nft.getNFTLists();
    let idList = value.map(item => parseInt(item.toString()));
    setNFTList(idList);
  };

  useEffect(() => {
    refresh();
  }, [god.currentNetwork.account]);

  const rows = nftList.map((row, index) => {
    return <StakeNode id={row} key={index}/>
  });

  // const rows = data.map((row, index) => {
  // const timeTotal = row.TotalTime;
  // const timePast = row.TotalTime - row.TimeRemaining;
  // const timeLeft = timeTotal - timePast;

  // const timePastP = timePast * 100 / timeTotal;
  // const timeLeftP = 100 - timePastP;

  // return (
  //   <>
  //   </>
  // <tr key={index}>
  //   <td>
  //     {row.Date}
  //   </td>
  //   <td style = {{ textAlign : 'center'}} >{row.Amount}</td>
  //   <td>{Intl.NumberFormat().format(row.NFT)}</td>
  //   <td>
  //     <Group position="apart">
  //       <Text size="xs" color="teal" weight={700}>
  //         {timePast.toFixed(0)}days passed
  //       </Text>
  //       <Text size="xs" color="red" weight={700}>
  //         {timeLeft.toFixed(0)}days left
  //       </Text>
  //     </Group>
  //     <Progress
  //       classNames={{ bar: classes.progressBar }}
  //       sections={[
  //         {
  //           value: timePastP,
  //           color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
  //         },
  //         {
  //           value: timeLeftP,
  //           color: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
  //         },
  //       ]}
  //     />
  //   </td>
  //   <td style = {{ paddingLeft : 20}} >
  //     {row.Multiplier}
  //   </td>
  //   <td>
  //     <Button color='teal' size="xs">Edit</Button>
  //   </td>
  // </tr>
  // );
  // });

  const tableView = () => {
    return (
      <ScrollArea style={{ width: '100%' }}>
        <Table sx={{ minWidth: 600, maxWidth: '100%', color: 'black' }} verticalSpacing="xs">
          <thead>
            <tr>
              <th style={{ color: 'black' }} >Date</th>
              <th style={{ color: 'black', textAlign: 'center' }} >Amount</th>
              <th style={{ color: 'black' }} >NFT id</th>
              <th style={{ color: 'black' }} >Time Remaining</th>
              <th style={{ color: 'black' }} >Multiplier</th>
              <th style={{ color: 'black' }} >Upgrade</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </ScrollArea>
    );
  };

  return (
    <WhiteLabel label={tableView()} className='' />
  );
});