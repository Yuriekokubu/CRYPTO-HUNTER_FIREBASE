import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { AiFillDelete } from 'react-icons/ai';
import { numberWithCommas } from '../CoinsTable';

export default function UserSidebar() {
  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const useStyles = makeStyles({
    container: {
      width: 350,
      padding: 25,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'monospace',
      backgroundColor: '#EEBC1D',
    },
    profile: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      height: '92%',
    },
    logout: {
      height: '8%',
      width: '100%',
      background: 'black',
      marginTop: 20,
    },
    picture: {
      width: 200,
      height: 200,
      cursor: 'pointer',
      objectFit: 'contain',
    },
    watchlist: {
      flex: 1,
      width: '100%',
      backgroundColor: 'white',
      padding: 15,
      paddingTop: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      overflowY: 'scroll',
    },
    coin: {
      padding: 10,
      borderRadius: 5,
      color: 'black',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#EEBC1D',
      boxShadow: '0 0 3px black',
    },
  });

  const classes = useStyles();

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: 'success',
      message: 'Logout Successfull !',
    });

    toggleDrawer();
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: 'success',
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: 'pointer',
              backgroundColor: '#EEBC1D',
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: '100%',
                    fontSize: 25,
                    textAlign: 'center',
                    fontWeight: 'bolder',
                    wordWrap: 'break-word',
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{ fontSize: 15 }}>Watchlist</span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: 'flex', gap: 8 }}>
                            {symbol}{' '}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: 'pointer' }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
