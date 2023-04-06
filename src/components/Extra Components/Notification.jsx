/* eslint-disable react/prop-types */
import { Alert, Snackbar } from '@mui/material';
import React from 'react';

function Notification(props) {
  const { notify, setNotify } = props;
  console.log(notify);
  return (
    <Snackbar open={notify.isOpen} autoHideDuration={3000}>
      <Alert security={notify.type}>{notify.message}</Alert>
    </Snackbar>
  );
}

export default Notification;
