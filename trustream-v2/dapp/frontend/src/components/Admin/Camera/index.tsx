import React, { useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button, createStyles, ScrollArea, Table } from '@mantine/core';
import { Edit, Eraser } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
        }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));


export default observer((props: Props) => {
  const { classes, cx } = useStyles();

  const [scrolled, setScrolled] = useState(false);

  return (
    <ScrollArea
      sx={{ height: 'calc(100vh - 200px)' }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Camera ID</th>
            <th>Link</th>
            <th>Coordinates</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>https://hello.comhttps://hello.comhttps://hello.com</td>
            <td>12.34,45.61</td>
            <td>
              <Button size="xs" mr={5}>
                <Edit size={15}/>Edit
              </Button>
              <Button color="red" size="xs">
                <Eraser size={15}/>Remove
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </ScrollArea>
  );
});

interface Props { }