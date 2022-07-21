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

interface TableReviewsProps {
    data: {
        id : string;
        address: string;
        heart_rate: string;
        timestamp: number;
        created_at: string;
        updated_at: string;
        createdAt : string;
        updatedAt : string;
    }[];
}

// let DeviceMockData = {
//     "data": []
// };

export default function TableReviews() {
    const { classes, theme } = useStyles();
    // const { data } = DeviceMockData;

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/device_status')
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
                <td>{row.id}</td>
                <td>{row.address}</td>
                <td>{row.heart_rate}</td>
                <td>{row.createdAt}</td>
                {/* <td>{row.created_at}</td>
                <td>{row.updated_at}</td>
                <td>{row.createdAt} </td>
                <td>{row.updatedAt} </td> */}
            </tr>
        );
    });

    return (
        <Layout>
            <ScrollArea>
                <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Address</th>
                            <th>HeartRate</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </Layout>
    );
}