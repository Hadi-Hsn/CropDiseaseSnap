// libs
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

// material-ui
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import LoadingButton from '@mui/lab/LoadingButton';

// services
import { signUp } from '../../services/Account';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: 'calc(100vh - 80px) !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    margin: '0 auto !important',
    width: '472px !important',
    '@media (max-width: 480px)': {
      width: '100% !important'
    }
  },
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
    '& .MuiSelect-select': {
      backgroundColor: '#ffffff !important'
    },
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

export default function SignUp() {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const alert = useAlert();
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line

  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

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
    if (password.trim().length > 7) {
      setIsPasswordInvalid(false);
    } else {
      setIsPasswordInvalid(true);
      return;
    }
    if (confirmPassword === password) {
      setIsConfirmPasswordInvalid(false);
    } else {
      setIsConfirmPasswordInvalid(true);
      return;
    }
    setIsLoading(true);
    return signUp({
      username: `_${Math.random().toString(36).substr(2, 9)}`,
      password: password,
      email: email,
      additionalInfo: 'ImagesProject'
    })
      .then(() => {
        alert.success(t('SUCCESSFULLY_SIGNED_UP'));
        navigate('/sign-in', { replace: true });
        setIsLoading(false);
      })
      .catch((error) => {
        var obj = error.response.data.errors;
        alert.error(obj[Object.keys(obj)[0]]);
        setIsLoading(false);
      });
  };

  const onSignInClick = () => {
    navigate('/sign-in', { replace: true });
  };
  return (
    <Box className={classes.mainContainer}>
      <Box component="form" noValidate onSubmit={handleSubmit} className={classes.form}>
        <Typography className={classes.title} component="h1" variant="h5" align="left">
          {t('SIGN_UP')}
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
        <TextField
          margin="dense"
          required
          fullWidth
          id="confirmPassword"
          type="password"
          label={t('CONFIRM_PASSWORD')}
          name="confirmPassword"
          autoComplete="confirmPassword"
          variant="outlined"
          error={isConfirmPasswordInvalid}
          helperText={isConfirmPasswordInvalid && t('PASSWORDS_DOESNT_MATCH')}
          onChange={confirmPasswordChangeHandler}
          value={confirmPassword}
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
            {t('SIGN_UP')}
          </LoadingButton>
        </Box>
        <Grid container>
          <Grid item xs className={classes.title2}>
            {t('HAVE_AN_ACCOUNT')}&nbsp;
            <Link href="#" variant="body2" className={classes.url} onClick={onSignInClick}>
              {t('SIGN_IN_HERE')}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
