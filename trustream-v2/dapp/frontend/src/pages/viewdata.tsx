import Layout from "@/components/EntireLayout";
import { createStyles, Container, Text, Button, Pagination, Grid, Table, Progress, ScrollArea, Group, Skeleton, useMantineTheme, Anchor } from '@mantine/core';
import axios from "axios";
import { useEffect, useState } from "react";
import StickyTable from "../components/StickyTable";
import Loading from "../components/Loading";
import Router, { useRouter } from 'next/router';
import { publicConfig } from "../config/public";
const { BACKEND_URL } = publicConfig;

const useStyles = createStyles((theme) => ({
    table_header_button: {
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    refreshButton: {
    }
}));

export default function TableReviews() {
    const { classes, theme } = useStyles();

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activePage, setPage] = useState(1);


    useEffect(() => {
        onRefresh();
        Router.events.on('routeChangeComplete', () => {
            onRefresh();
        });
    }, []);

    const onRefresh = () => {
        setTableData([]);
        setLoading(true);
        axios.get(`${BACKEND_URL}/api/device_status`)
            .then((data) => {
                // console.log('data', data);
                setTableData(data.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    return (
        <Layout>
            {loading && <Loading />}
            <div className={classes.table_header_button}>
                <Button disabled={loading} onClick={onRefresh} className={classes.refreshButton}>Refresh</Button>
            </div>
            {!loading && <StickyTable data={tableData} />}
        </Layout>
    );
}