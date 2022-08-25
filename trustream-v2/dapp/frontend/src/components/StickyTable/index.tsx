import { useState } from 'react';
import { createStyles, Table, ScrollArea, Anchor } from '@mantine/core';
import { helper } from '@/lib/helper';
import { useStore } from '../../store/index';

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

interface TableScrollAreaProps {
    data: {
        id: string;
        miner : string;
        timestamp: number;
        address: string;
        pedestrains: string;
        cars: string;
        bus: string;
        truck: string;
        total: string;
        link: string;
    }[];
}

export default function TableScrollArea({ data }: TableScrollAreaProps) {
    const { god, lang } = useStore();
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    // if (data.length > 0) {
    //     console.log('row1', data[0].address, from(data[0].address), from(data[0].address).string());
    //     console.log('row2', god.currentNetwork.account, from(god.currentNetwork.account), from(god.currentNetwork.account).string());
    // }

    const getValues = (row) => {
        let digits = "0123456789";
        let ret = [];

        for (let i = 0; i < row.length; i++) {
            if (row[i] == '.' || row[i] == '-' || row[i] == '+' || digits.indexOf(row[i]) != -1) {
                let str = "";
                for (; i < row.length; i++) {
                    if (!(row[i] == '.' || row[i] == '-' || row[i] == '+' || digits.indexOf(row[i]) != -1))
                        break;
                    str += row[i];
                }
                ret.push(str);
            }
        }

        return ret;
    };

    const getX = (row) => {
        return getValues(row.coordinates)[0];
    };

    const getY = (row) => {
        return getValues(row.coordinates)[1];
    };

    const rows = data.map((row) => (
        <tr key={row.id}>
            <td>{new Date(row.timestamp * 1000).toLocaleString()}</td>
            <td>{row.miner}</td>
            <td>{helper.string.truncate(row.address || '0x......', 12, '...')}</td>
            {/* <td>{row.pedestrains}</td>
            <td>{row.cars}</td>
            <td>{row.bus}</td>
            <td>{row.truck}</td> */}
            <td>{row.total}</td>
            {/* <td>
                <Anchor<'a'>
                    size="sm"
                    onClick={(event) => {
                        event.preventDefault();
                        window.open(row.link);
                    }}>
                    Video
                </Anchor>
            </td> */}
            {/* <td>{row.city}</td>
            <td>{row.region}</td>
            <td>{row.postalcode}</td>
            <td>{row.country}</td>
            <td>{row.continent}</td>
            <td>{row.coordinates}</td> */}
        </tr>
    ));

    return (
        <ScrollArea sx={{ height: 'calc(100vh - 200px)' }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table sx={{ minWidth: 700 }}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <tr>
                        <th>Timestamp</th>
                        <th>Name</th>
                        <th>Wallet</th>
                        {/* <th>Pedestrians</th>
                        <th>Cars</th>
                        <th>Bus</th>
                        <th>Truck</th> */}
                        <th>Total of Events</th>
                        {/* <th>Video Link</th> */}
                        {/* <th>City</th>
                        <th>Region</th>
                        <th>Postalcode</th>
                        <th>Country</th>
                        <th>Continent</th>
                        <th>Coordinates</th> */}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}