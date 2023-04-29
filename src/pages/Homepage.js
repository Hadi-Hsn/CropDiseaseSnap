// libs
import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAlert } from 'react-alert';

// mui
import { IconButton, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

// components
import PhotoCapture from '../components/photoCapture/PhotoCapture';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.purple.main,
    fontSize: '32px !important',
    fontWeight: 'bold !important',
    '@media (max-width: 820px)': {
      fontSize: '26px !important',
      padding: '0 32px'
    },
    '@media (max-width: 480px)': {
      fontSize: '20px !important',
      padding: '0 18px'
    }
  },
  subTitle: {
    color: theme.palette.common.purple.main,
    marginBottom: '5px !important',
    fontSize: '18px !important',
    lineHeight: '22px !important',
    '@media (max-width: 820px)': {
      padding: '0 32px'
    },
    '@media (max-width: 480px)': {
      padding: '0 18px'
    }
  },
  container: {
    backgroundColor: '#F7F7FC',
    padding: '32px',
    borderRadius: '8px',
    '@media (max-width: 480px)': {
      padding: '18px',
      borderRadius: '0px'
    }
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px auto !important',
    '@media (max-width: 480px)': {
      flexDirection: 'column',
      marginTop: '10px'
    }
  },
  centeredBox: {
    width: '800px',
    '@media (max-width: 480px)': {
      width: '100%'
    }
  },
  fixedBox: {
    position: 'absolute',
    top: '18%',
    right: '18%',
    textAlign: 'center',
    fontSize: '18px',
    width: '250px',
    height: '250px',
    border: '5px solid #fff',
    zIndex: '9999'
  }
}));

const LandingPage = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const alert = useAlert();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .catch(() => alert.error(t('PLEASE_ENABLE_CAMERA')));
  }, []);

  return (
    // <Box className={classes.mainContainer}>
    // <Box className={classes.centeredBox}>
    <>
      {/* <Box sx={{ width: '100%', height: '80%' }}> */}
      <Typography className={classes.title}>
        {t('CAPTURE_YOUR_PLANT_DISEASE')}{' '}
        <Tooltip enterTouchDelay={0} title={<Trans i18nKey="INFORMATION_ABOUT_PESTS" t={t} />}>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <div className={classes.fixedBox}></div>

      <PhotoCapture />
      {/* </Box> */}
    </>
    // {/* </div> */}
    // </Box>
  );
};

export default LandingPage;
