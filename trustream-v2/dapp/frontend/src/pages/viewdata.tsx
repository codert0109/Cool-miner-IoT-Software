import Layout from "@/components/EntireLayout";
import { createStyles, Container, Text, Button, Grid, Table, Progress, ScrollArea, Group, Skeleton, useMantineTheme, Anchor } from '@mantine/core';
import STAKEDCLAIMED from "@/components/STAKEDCLAIMED";
import BUYELUM from "@/components/BUYELUM";
import INFOCONTAINER from '@/components/INFOCONTAINER';
import MyAccount from '@/components/MyAccount';
import LogBook from '@/components/LogBook';
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    },
}));

export default function TableReviews() {
    const { classes, theme } = useStyles();
    // const { data } = DeviceMockData;

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios.get('/api/device_status')
            .then((data) => {
                console.log('data', data);
                setTableData(data.data.data);
            })
            .catch((err) => {

            });
    }, []);

    const rows = tableData.map((row) => {
        return (
            <tr key={row.id}>
                {/* <td>{row.id}</td> */}
                <td>{new Date(row.timestamp * 1000).toString()}</td>
                <td>{row.address}</td>
                <td>{row.pedestrains}</td>
                <td>{row.cars}</td>
                <td>{row.bus}</td>
                <td>{row.truck}</td>
                <td>{row.total}</td>
                <td>{row.city}</td>
                <td>{row.region}</td>
                <td>{row.postalcode}</td>
                <td>{row.country}</td>
                <td>{row.continent}</td>
                <td>{row.coordinates}</td>
            </tr>
        );
    });

    return (
        <Layout>
            <ScrollArea>
                <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Address</th>
                            <th>Pedestrains</th>
                            <th>Cars</th>
                            <th>Bus</th>
                            <th>Truck</th>
                            <th>Total</th>
                            <th>City</th>
                            <th>Region</th>
                            <th>Postalcode</th>
                            <th>Country</th>
                            <th>Continent</th>
                            <th>Coordinates</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </Layout>
    );
}