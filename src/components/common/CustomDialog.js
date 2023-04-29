// libs
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';

// styles
import { makeStyles } from '@mui/styles';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// selectors
import { languageSelector } from '../../store/selectors';

const useStyles = makeStyles(() => ({
  loadingButtonON: {
    marginRight: '18px !important',
    width: '145px !important',
    transition: 'width .3s ease-out 0s !important',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  loadingButtonOFF: {
    marginRight: '18px !important',
    width: '80px !important',
    transition: '.1s linear 0s !important'
  },
  submitButtonAR: {
    fontWeight: 'bold !important',
    margin: '0px 0px 10px 16px !important'
  },
  submitButtonEN: {
    fontWeight: 'bold !important',
    margin: '0px 16px 10px 0px !important'
  }
}));

export default function CustomDialog(props) {
  const {
    isOpen,
    close,
    action,
    done,
    title,
    subtitle,
    confirmText,
    successMessage,
    errorMessage,
    submittingText
  } = props;
  const classes = useStyles();

  const { t: translate } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const confirm = useCallback(() => {
    setIsLoading(true);

    if (typeof action === 'function') {
      action()
        .then(() => {
          setIsLoading(false);
          close();
          if (successMessage) {
            alert.success(successMessage);
          }
          if (typeof done === 'function') {
            done();
          }
        })
        .catch(() => {
          setIsLoading(false);
          close();
          if (errorMessage) {
            alert.error(errorMessage, {
              timeout: 10000
            });
          }
        });
    }
  }, [action, close, done]);
  const language = useSelector(languageSelector);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {title}
          <IconButton
            aria-label="close"
            onClick={close}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: '#434343' }}>
            {subtitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={close}
            disabled={isLoading}
            disableElevation
            sx={{ mb: '9px', mr: '12px' }}>
            {translate('CANCEL')}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={confirm}
            disableElevation
            loading={isLoading}
            loadingPosition={'end'}
            endIcon={<></>}
            startIcon={<></>}
            className={
              language === 'ar'
                ? isLoading
                  ? `${classes.submitButtonAR} ${classes.loadingButtonON}`
                  : `${classes.submitButtonAR} ${classes.loadingButtonOFF}`
                : isLoading
                ? `${classes.submitButtonEN} ${classes.loadingButtonON}`
                : `${classes.submitButtonEN} ${classes.loadingButtonOFF}`
            }>
            {!isLoading && <Typography>{confirmText}</Typography>}
            {isLoading && <Typography sx={{ mr: '20px' }}>{submittingText}</Typography>}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
