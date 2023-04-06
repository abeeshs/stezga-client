/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function DeleteModal(props) {
  const { title, message, openModal, setOpenModal, confirmDelete } = props;

  const deleteHandle = () => {
    confirmDelete();
    setOpenModal(false);
  };
  return (
    <div>
      <Dialog open={openModal} maxWidth="xs" fullWidth>
        <DialogTitle>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </div>
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <Button></Button>
        </Box>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={deleteHandle}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;
