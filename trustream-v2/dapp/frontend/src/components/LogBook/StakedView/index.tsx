import React from 'react';
import { createStyles, Table, Button, Progress, Anchor, Text, Group, ScrollArea, Box } from '@mantine/core';
import WhiteLabel from "@/components/WhiteLabel";

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
  }
}));

interface TableReviewsProps {
  data: {
    Date : string,
    Amount : number,
    NFT : number,
    Multiplier : string,
    TimeRemaining : number,
    TotalTime : number
  }[];
}

export default function TableReviews({ data }: TableReviewsProps) {
  const { classes, theme } = useStyles();

  const rows = data.map((row, index) => {
    const timeTotal = row.TotalTime;
    const timePast = row.TotalTime - row.TimeRemaining;
    const timeLeft = timeTotal - timePast;

    const timePastP = timePast * 100 / timeTotal;
    const timeLeftP = 100 - timePastP;

    return (
      <tr key={index}>
        <td>
          {/* <Anchor<'a'> size="sm" onClick={(event) => event.preventDefault()}> */}
            {row.Date}
          {/* </Anchor> */}
        </td>
        <td style = {{ textAlign : 'center'}} >{row.Amount}</td>
        <td>{Intl.NumberFormat().format(row.NFT)}</td>
        <td>
          <Group position="apart">
            <Text size="xs" color="teal" weight={700}>
              {timePast.toFixed(0)}days passed
            </Text>
            <Text size="xs" color="red" weight={700}>
              {timeLeft.toFixed(0)}days left
            </Text>
          </Group>
          <Progress
            classNames={{ bar: classes.progressBar }}
            sections={[
              {
                value: timePastP,
                color: theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[6],
              },
              {
                value: timeLeftP,
                color: theme.colorScheme === 'dark' ? theme.colors.red[9] : theme.colors.red[6],
              },
            ]}
          />
        </td>
        <td style = {{ paddingLeft : 20}} >
          {row.Multiplier}
        </td>
        <td>
          <Button color='teal' size="xs">Upgrade</Button>
        </td>
      </tr>
    );
  });

  const tableView = () => {
    return (
      <ScrollArea style={{ width : '100%' }}>
        <Table sx={{ minWidth: 600, maxWidth: '100%', color : 'black' }} verticalSpacing="xs">
          <thead>
            <tr>
              <th style={{ color : 'black'}} >Date</th>
              <th style={{ color : 'black', textAlign : 'center'}} >Amount</th>
              <th style={{ color : 'black'}} >NFT id</th>
              <th style={{ color : 'black'}} >Time Remaining</th>
              <th style={{ color : 'black'}} >Multiplier</th>
              <th style={{ color : 'black'}} >Upgrade</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
       </ScrollArea>
    );
  };

  return (
    <WhiteLabel label={tableView()} className=''/>
  );
}