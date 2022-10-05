import React, { useEffect, useState } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button, createStyles, Modal, ScrollArea, Table, Grid, TextInput } from '@mantine/core';
import { Edit, Eraser, CameraPlus } from 'tabler-icons-react';
import join from 'classnames';
import { useStore } from '@/store/index';
import Swal from 'sweetalert2';

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

  icon: {
    marginRight: 5
  },

  floatRight: {
    float: 'right'
  },

  alignRight: {
    alignItems: 'right',
    justifyContent: 'end',
    display: 'flex'
  }
}));


export default observer((props: Props) => {
  const { god, camera, auth } = useStore();
  const { classes, cx, theme } = useStyles();

  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [active_id, setActiveID] = useState(-1);

  const [input_link, setInputLink] = useState('');
  const [input_coord, setInputCoord] = useState('');

  useEffect(() => {
    camera.refresh();
  }, []);

  const onNew = (e) => {
    setActiveID(-1);
    setModalOpen(true);
    setInputLink('');
    setInputCoord('');
  };

  const onEdit = ({id, link, coord}) => {
    setActiveID(id);
    setModalOpen(true);
    setInputLink(link);
    setInputCoord(coord);
  }

  const onRemove = (id) => {
    const performAction = () => {
      camera.remove({ id })
        .then((data) => {
          if (data.data.status == 'OK') {
            Swal.fire(
              'Success',
              `<p>Removed successfully!.</p>`,
              'success'
            );
            camera.refresh();
          } else {
            Swal.fire(
              'Error',
              `<p>Errors occured while removing!.</p>`,
              'error'
            );
          }
        })
        .catch((err) => {
          Swal.fire(
            'Error',
            `<p>Errors occured while removing!.</p>`,
            'error'
          );
        });
    };

    auth.actionWithAuth(performAction);
  }

  const onSave = (e) => {
    setModalOpen(false);

    const performAction = () => {
      if (active_id == -1) {
        camera.add({ link: input_link, coordinates: input_coord })
          .then((data) => {
            if (data.data.status == 'OK') {
              Swal.fire(
                'Success',
                `<p>Added successfully!.</p>`,
                'success'
              );
              camera.refresh();
            } else {
              Swal.fire(
                'Error',
                `<p>Errors occured while adding!.</p>`,
                'error'
              );
            }
          })
          .catch((err) => {
            Swal.fire(
              'Error',
              `<p>Errors occured while adding!.</p>`,
              'error'
            );
          });
      } else {
        camera.update({ id : active_id, link: input_link, coordinates: input_coord })
          .then((data) => {
            if (data.data.status == 'OK') {
              Swal.fire(
                'Success',
                `<p>Updated successfully!.</p>`,
                'success'
              );
              camera.refresh();
            } else {
              Swal.fire(
                'Error',
                `<p>Errors occured while updating!.</p>`,
                'error'
              );
            }
          })
          .catch((err) => {
            Swal.fire(
              'Error',
              `<p>Errors occured while updating!.</p>`,
              'error'
            );
          });
      }
    }

    auth.actionWithAuth(performAction);
  };

  const onLinkChange = (event) => {
    setInputLink(event.currentTarget.value);
  };

  const onCoordinatesChange = (event) => {
    setInputCoord(event.currentTarget.value);
  };

  const renderModalBody = () => {
    return (
      <Grid>
        <Grid.Col sm={12} md={4}>Link</Grid.Col>
        <Grid.Col sm={12} md={8}>
          <TextInput value={input_link} onChange={onLinkChange} size="xs"></TextInput>
        </Grid.Col>
        <Grid.Col sm={12} md={4}>Coordinates</Grid.Col>
        <Grid.Col sm={12} md={8}>
          <TextInput value={input_coord} onChange={onCoordinatesChange} size="xs"></TextInput>
        </Grid.Col>
        <Grid.Col sm={12} md={12} className={classes.alignRight}>
          <Button onClick={onSave} color="green" size="xs" mr={5}>
            Save
          </Button>
          <Button onClick={() => setModalOpen(false)} color="gray" size="xs">
            Cancel
          </Button>
        </Grid.Col>
      </Grid>
    )
  };

  const renderBody = () => {
    if (camera.cameraList.length == 0) {
      return (
        <tr key="nothing">
          <td colSpan={4} style={{ textAlign: 'center' }}>No Camera Data</td>
        </tr>
      )
    }
    return camera.cameraList.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.link}</td>
          <td>{item.coordinates}</td>
          <td>
            <Button 
              onClick={() => onEdit({id : item.id, link : item.link, coord : item.coordinates})} 
              size="xs" mr={5}>
              <Edit size={15} />Edit
            </Button>
            <Button onClick={() => onRemove(item.id)} color="red" size="xs">
              <Eraser size={15} />Remove
            </Button>
          </td>
        </tr>
      )
    });
  }

  return (
    <ScrollArea
      sx={{ height: 'calc(100vh - 200px)' }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Modal
        centered
        title={active_id == -1 ? "Add New Camera" : "Edit Camera Setting"}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0}
        overlayBlur={0.8}
        opened={modalOpen}
        onClose={function (): void {
          setModalOpen(false);
        }}
        style={{
          zIndex: 3000
        }}>
        {renderModalBody()}
      </Modal>

      <Button size="xs" onClick={onNew} mb={5} className={classes.floatRight}>
        <CameraPlus size={15} className={classes.icon} /> New
      </Button>
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Camera ID</th>
            <th>Link</th>
            <th>Coordinates</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderBody()}
        </tbody>
      </Table>
    </ScrollArea>
  );
});

interface Props { }