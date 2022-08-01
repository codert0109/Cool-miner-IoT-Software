import Layout from "@/components/EntireLayout";
import { createStyles, Button, ScrollArea } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    progressBar: {
        '&:not(:first-of-type)': {
            borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
        },
    },
}));

export default function TableReviews() {
    const { classes, theme } = useStyles();
    // const { god, lang } = useStore();
    return (
        <Layout>
            <ScrollArea>
                Welcome To Login Page
            </ScrollArea>
        </Layout>
    );
}