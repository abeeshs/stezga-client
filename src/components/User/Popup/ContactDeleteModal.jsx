import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';

function ContactDeleteModal(props) {
  const { openDeleteModal, setOpenDeleteModal, confirmDeleteContact } = props;

  return (
    <div>
      <Dialog open={openDeleteModal} maxWidth="xs" fullWidth>
        <DialogTitle>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Delete
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography>Do you want to delete this contact ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpenDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => confirmDeleteContact()}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContactDeleteModal;
