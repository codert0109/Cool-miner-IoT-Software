import { Footer, createStyles, useMantineTheme, Container, Group, ActionIcon } from '@mantine/core';
import { BrandTwitter, BrandLinkedin, BrandDiscord } from 'tabler-icons-react';


const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        // paddingTop: theme.spacing.xl,
        // paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
        maxWidth: 'none'
    },
    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
    imgdiv: {
        flexGrow: 1
    },
    imgstyle: {
        height: '17px'
    }
}));

export default function () {
    const theme = useMantineTheme();
    const { classes } = useStyles();

    return (
        <Footer height={50} p="sm">
            <Container className={classes.inner}>
                {/* <MantineLogo /> */}
                <div className={classes.imgdiv}>
                    {theme.colorScheme === 'dark' && <img className={classes.imgstyle} src="/images/logo/Elumicate-font-viga-white-logo-SMALL.png"></img>}
                    {theme.colorScheme !== 'dark' && <img className={classes.imgstyle} src="/images/logo/Elumicate-font-viga-black-logo-SMALL.png"></img>}
                </div>

                <Group spacing={0} className={classes.links} position="right" noWrap>
                    <ActionIcon size="lg" onClick={() => open("https://twitter.com/elumicate/")}>
                        {/* <BrandTwitter size={18} /> */}
                        {theme.colorScheme === 'dark' &&    <img src="images/link_svgs/twitter_black_theme.svg" height="18"/>}
                        {theme.colorScheme === 'light' &&   <img src="images/link_svgs/twitter_light_theme.svg" height="18"/>}
                    </ActionIcon>
                    <ActionIcon size="lg" onClick={() => open("https://www.linkedin.com/company/elumicate-inc/")}>
                        {/* <BrandLinkedin size={18} /> */}
                        {theme.colorScheme === 'dark' &&    <img src="images/link_svgs/linkedin_black_theme.svg" height="18"/>}
                        {theme.colorScheme === 'light' &&   <img src="images/link_svgs/linkedin_light_theme.svg" height="18"/>}
                    </ActionIcon>
                    <ActionIcon size="lg" onClick={() => open("https://discord.gg/uVBdzJfPRK")}>
                        <BrandDiscord size={18} />
                    </ActionIcon>
                </Group>
            </Container>
        </Footer>
    );
};