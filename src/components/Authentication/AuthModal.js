import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../config/firebaseConfig';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  boxShadow: 24,
  padding: 4,
  border: '3px solid white',
  borderRadius: '10px',
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: 'white',
    borderRadius: 10,
  },
  google: {
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 20,
    fontSize: 20,
  },
}));

const AuthModal = () => {
  const classes = useStyles();
  const { setAlert } = CryptoState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: 'success',
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: '#EEBC1D',
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar
              position="static"
              style={{ backgroundColor: 'transparent', color: 'white' }}
            >
              <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="Login" value="1" />
                <Tab label="Sign Up" value="2" />
              </Tabs>
            </AppBar>

            {value === '1' && <Login handleClose={handleClose} />}
            {value === '2' && <SignUp handleClose={handleClose} />}

            <Box className={classes.google}>
              <span style={{ color: 'grey', margin: '10px' }}>OR</span>
              <GoogleButton
                style={{ width: '100%', outline: 'none' }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
