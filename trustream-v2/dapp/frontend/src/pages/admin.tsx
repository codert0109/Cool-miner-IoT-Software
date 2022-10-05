import Layout from "@/components/EntireLayout";
import { createStyles, ScrollArea, Tabs } from '@mantine/core';
import { useStore } from '@/store/index';
import MultipleWalletAdd from "../components/Admin/MultipleWalletAdd";
import SingleWalletAdd from "../components/Admin/SingleWalletAdd";
import UpdateComponent from "../components/Admin/Update";
import Database from "@/components/Admin/Database";
import Camera from "@/components/Admin/Camera";

const useStyles = createStyles((theme) => ({
}));

export default function TableReviews() {
    const { classes, theme } = useStyles();
    const { god, lang } = useStore();

    return (
        <Layout>
            <ScrollArea>
                <Tabs color="#ffffff" defaultValue="wallet">
                    <Tabs.Tab label="Wallet" value="wallet">
                        <SingleWalletAdd />
                        <MultipleWalletAdd />
                    </Tabs.Tab>
                    <Tabs.Tab label="Update" value="update">
                        <UpdateComponent/>
                    </Tabs.Tab>
                    {/* <Tabs.Tab label="Database" value="database">
                        <Database/>
                    </Tabs.Tab> */}
                    <Tabs.Tab label="Camera" value="camera">
                        <Camera/>
                    </Tabs.Tab>
                </Tabs>
            </ScrollArea>
        </Layout>
    );
}