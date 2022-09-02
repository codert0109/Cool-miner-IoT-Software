import { useEffect, useState } from 'react';
import { createStyles, Table, ScrollArea, Anchor } from '@mantine/core';
import { helper } from '@/lib/helper';
import { useStore } from '../../store/index';
import { Download } from "tabler-icons-react";
import $ from 'axios';

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

    textcolor : {
        color : theme.colorScheme === 'dark' ? 'white' : 'black'
    }
}));

interface TableScrollAreaProps {
    data: {
        id          : string;
        version     : string;
        message     : number;
        download    : string;
        createdAt   : string;
        updatedAt   : string;
    }[];
}

export default function TableScrollArea() {
    const { god, lang } = useStore();
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        $.get('https://miner.elumicate.com/update/all')
            .then((data) => {
                setData(data.data.data.reverse());
            })
            .catch((err) => {
                setData([]);
            });
    }, []);

    const rows = data.map((row) => (
        <tr key={row.id}>
            <td>{row.version}</td>
            <td>{row.message}</td>
            <td>
                <a href={row.download} className={classes.textcolor}>
                    <Download/>
                </a>
            </td>
            <td>{new Date(row.createdAt).toLocaleString()}</td>
        </tr>
    ));

    return (
        <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table sx={{ minWidth: 700 }}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        <th>Version</th>
                        <th>Message</th>
                        <th>Download</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}