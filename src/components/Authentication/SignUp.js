import React, { useState } from 'react';
import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAlert } = CryptoState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Password do not match',
        type: 'error',
      });
      return;
    }

    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: 'success',
      });

      handleClose();
      setLoading(false);
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
      setLoading(false);

      return;
    }
  };

  return (
    <>
      <Box
        mt={3}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="password"
          label="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <TextField
          variant="outlined"
          type="password"
          label="ConfirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: '#EEBC1D' }}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress color="secondary" /> : 'Sign Up'}
        </Button>
      </Box>
    </>
  );
};

export default SignUp;
