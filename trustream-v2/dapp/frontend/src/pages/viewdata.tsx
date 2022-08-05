import Layout from "@/components/EntireLayout";
import { createStyles, Container, Text, Button, Grid, Table, Progress, ScrollArea, Group, Skeleton, useMantineTheme, Anchor } from '@mantine/core';
import STAKEDCLAIMED from "@/components/STAKEDCLAIMED";
import BUYELUM from "@/components/BUYELUM";
import INFOCONTAINER from '@/components/INFOCONTAINER';
import MyAccount from '@/components/MyAccount';
import LogBook from '@/components/LogBook';
import axios from "axios";
import { useEffect, useState } from "react";

import StickyTable from "../components/StickyTable";

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    }
}));

export default function TableReviews() {
    const { classes, theme } = useStyles();

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios.get('/api/device_status')
        // axios.get('https://localhost:3333/api/device_status')
            .then((data) => {
                // console.log('data', data);
                setTableData(data.data.data);
            })
            .catch((err) => {

            });
    }, []);

    return (
        <Layout>
            <StickyTable data={tableData}/>
        </Layout>
    );
}