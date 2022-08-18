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
    table_header_button : {
        marginTop : 10,
        marginBottom : 10,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },
    refreshButton : {
    }
}));

export default function TableReviews() {
    const { classes, theme } = useStyles();

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        onRefresh();
    }, []);

    const onRefresh = () => {
        setTableData([]);
        axios.get('/api/device_status')
        // axios.get('https://localhost:3333/api/device_status')
            .then((data) => {
                // console.log('data', data);
                setTableData(data.data.data);
            })
            .catch((err) => {

            });
    };

    return (
        <Layout>
            <div className={classes.table_header_button}>
                <Button disabled={false} onClick={onRefresh} className={classes.refreshButton}>Refresh</Button>
            </div>
            <StickyTable data={tableData}/>
        </Layout>
    );
}