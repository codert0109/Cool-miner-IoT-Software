import { Modal, useMantineTheme } from '@mantine/core';

export default function Demo() {
    const theme = useMantineTheme();

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3} opened={false} onClose={function (): void {
                throw new Error('Function not implemented.');
            } }        >
            {/* Modal content */}
        </Modal>
    );
}