import { useEffect, useState } from 'react';
import { createStyles, Table, ScrollArea, Anchor, Button, Container } from '@mantine/core';
import { useStore } from '../../store/index';
import { Download } from "tabler-icons-react";
import $ from 'axios';
import Swal from 'sweetalert2';
import { publicConfig } from "../../config/public";
const { BACKEND_URL } = publicConfig;

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

    textcolor: {
        color : 'black'
    },

    messagediv : {
        display : 'flex',
        height : 42,
        overflow : 'hidden'
    },

    messagetext : {
        // overflow : 'hidden',
        // whiteSpace : 'nowrap',
        // textOverflow : 'ellipsis'
    },

    center : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },

    releaseBTN : {
        color : 'black', 
        borderColor : 'black'
    }
}));

interface TableScrollAreaProps {
    data: {
        id: string;
        version: string;
        message: number;
        note: string;
        download: string;
        createdAt: string;
        updatedAt: string;
    }[];
}

export default function TableScrollArea() {
    const { god, lang } = useStore();
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        $.get(`${BACKEND_URL}/update/all`)
            .then((data) => {
                setData(data.data.data.reverse());
            })
            .catch((err) => {
                setData([]);
            });
    }, []);

    const showRelease = (index) => {
        if (data[index].note === null) {
            Swal.fire(
                'Info',
                `<p>This update does not include release notes.</p>`,
                'info'
            );
        } else {
            let noteList = data[index].note.split('\n');
            let noteInfo = '';
            for (let i = 0; i < noteList.length; i++) {
                noteInfo += `<p style="text-align:left;">${noteList[i]}</p>`;
            }
            Swal.fire(
                'Release Notes',
                `${noteInfo}`,
                'success'
            );
        }
    };

    const rows = data.map((row, index) => (
        <tr key={row.id} style={{height : 60}}>
            <td>{row.version}</td>
            <td>
                <div className={classes.messagediv}>
                    <div className={classes.messagetext}>
                        {index == 0 && row.message}
                    </div>
                    <div className={classes.center}>
                        <Button 
                            onClick={() => showRelease(index)}
                            className={classes.releaseBTN} 
                            variant="white" 
                            size="xs">
                            Click for release notes
                        </Button>
                    </div>
                </div>
            </td>
            <td>{new Date(row.createdAt).toLocaleString()}</td>
            <td>
                <div className={classes.center}>
                    {
                        index == 0 && row.download !== '' && 
                        <a href={row.download} className={classes.textcolor}>
                            <Download />
                        </a>
                    }
                    {
                        index == 0 && row.download === '' && 
                        <span>Not Yet</span>
                    }
                </div>
            </td>
        </tr>
    ));

    return (
        <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table style={{backgroundColor : 'white', color : 'black'}}>
                <thead>
                    <tr>
                        <th style={{color : 'black'}}>Version</th>
                        <th style={{color : 'black'}}>Information</th>
                        <th style={{color : 'black'}}>Time</th>
                        <th style={{color : 'black'}}>Download</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}