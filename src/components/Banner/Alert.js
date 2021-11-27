import { Snackbar } from '@material-ui/core';
import React from 'react';
import { CryptoState } from '../../CryptoContext';
import MuiAlert from '@mui/material/Alert';

const Alert = () => {
  const { alert, setAlert } = CryptoState();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          elevation={6}
          severity={alert.type}
          variant="filled"
        >
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Alert;
