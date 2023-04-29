// libs
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

// material-ui
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';

// services
import { signIn } from '../../services/Account';
import buildAction from '../../util/buildAction';
import { AppActions } from '../../store/actions';
import { parseJwt } from '../../util/parseJwt';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.purple.main,
    fontWeight: 'bold !important'
  },
  title2: {
    color: theme.palette.common.purple.main
  },
  url: {
    color: '#29B6C8 !important',
    fontWeight: 'bold !important'
  },
  input: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#ffffff !important'
    }
  },
  form: {
    backgroundColor: '#F7F7FC',
    padding: '32px',
    borderRadius: '8px',
    '@media (max-width: 480px)': {
      height: '100vh',
      padding: '200px 18px 18px 18px !important',
      borderRadius: '0px'
    }
  },
  signInStyles: {
    width: '130px !important',
    height: '50px !important',
    fontSize: '18px !important',
    backgroundColor: '#6F4B99  !important',
    marginTop: '8px !important',
    marginBottom: '8px !important'
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setisPasswordInvalid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email) => email.match(regexEmail);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateEmail(email.trim())) {
      setIsEmailInvalid(false);
    } else {
      setIsEmailInvalid(true);
      return;
    }
    if (password.trim().length > 0) {
      setisPasswordInvalid(false);
    } else {
      setisPasswordInvalid(true);
      return;
    }
    setIsLoading(true);
    return signIn({
      email: email,
      password: password
    })
      .then((resp) => {
        window.localStorage.setItem('token', resp.data.token);
        dispatch(buildAction(AppActions.SET_META_DATA, resp.data.token));
        let user = parseJwt(resp.data.token);
        if (user?.[Object?.keys(user)?.[5]] === 'Admin') {
          navigate('/', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
        setIsLoading(false);
      })
      .catch(() => {
        alert.error(t('WRONG_EMAIL_OR_PASSWORD'));
        setIsLoading(false);
      });
  };

  const onSignUpClick = () => {
    navigate('/sign-up', { replace: true });
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginX: 'auto'
      }}>
      <Box
        sx={{
          pt: '20px'
        }}>
        <Box component="form" noValidate onSubmit={handleSubmit} className={classes.form}>
          <Typography className={classes.title} component="h1" variant="h5" align="left">
            {t('SIGN_IN')}
          </Typography>

          <TextField
            margin="dense"
            required
            fullWidth
            id="email"
            label={t('EMAIL')}
            name="email"
            autoComplete="email"
            variant="outlined"
            error={isEmailInvalid}
            helperText={isEmailInvalid && t('PLEASE_ENTER_A_VALID_EMAIL')}
            onChange={emailChangeHandler}
            value={email}
            className={classes.input}
            autoFocus
          />
          <TextField
            margin="dense"
            required
            fullWidth
            id="password"
            type="password"
            label={t('PASSWORD')}
            name="password"
            autoComplete="password"
            variant="outlined"
            error={isPasswordInvalid}
            helperText={isPasswordInvalid && t('PLEASE_ENTER_A_PASSWORD')}
            onChange={passwordChangeHandler}
            value={password}
            className={classes.input}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse'
            }}>
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
              justify="flex-end"
              className={classes.signInStyles}>
              {isLoading ? '' : t('SIGN_IN')}
            </LoadingButton>
          </Box>
          <Grid container>
            <Grid item xs className={classes.title2}>
              {t('NEW')}&nbsp;
              <Link href="#" variant="body2" className={classes.url} onClick={onSignUpClick}>
                {t('SIGN_UP_HERE')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
