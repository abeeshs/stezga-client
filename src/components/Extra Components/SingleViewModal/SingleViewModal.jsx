import React from 'react';
import './SingleViewModal.css';
import { Dialog, DialogActions, DialogContent } from '@mui/material';

function SingleViewModal(props) {
  const { children, singleView } = props;

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={singleView}
        sx={{
          borderRadius: '10px !importand',
          '& .MuiPaper-root': {
            borderRadius: '15px',
          },
        }}
      >
        {/* x */}
        <DialogContent
          dividers
          sx={{ backgroundColor: '#F9F9FA ', height: '600px' }}
        >
          <div>{children}</div>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </div>
  );
}

export default SingleViewModal;
