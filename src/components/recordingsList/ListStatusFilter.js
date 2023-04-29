// libs
import React from 'react';

// mui
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    // flexDirection: 'column',
    gap: '10px',
    maxWidth: '100vw',
    // overflowX: 'auto !important',
    // overflowY: 'hidden !important',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    flexWrap: 'wrap',
    margin: '10px auto 0px auto !important',
    '@media (max-width: 1290px)': {
      gap: '20px'
    },
    '@media (max-width: 900px)': {
      gap: '10px'
    }
  },
  countStyles: {
    color: '#20176C',
    fontWeight: 'bold',
    fontSize: '65px',
    padding: theme.direction === 'ltr' ? '0px 0px 0px 20px' : '0px 20px 0px 0px',
    margin: '0',
    marginTop: '-5px !important',
    '@media (max-width: 1290px)': {
      padding: theme.direction === 'ltr' ? '0px 0px 0px 15px' : '0px 15px 0px 0px',
      fontSize: '45px'
    },
    '@media (max-width: 900px)': {
      padding: theme.direction === 'ltr' ? '4px 0px 0px 12px' : '4px 12px 0px 0px',
      fontSize: '30px'
    }
  },
  textTooltipContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px'
  },
  statusTextStyles: {
    color: '#575756',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: theme.direction === 'ltr' ? '0px 0px 0px 20px' : '0px 20px 0px 0px',
    marginTop: '-23px !important',
    '@media (max-width: 1290px)': {
      padding: theme.direction === 'ltr' ? '0px 0px 0px 15px' : '0px 15px 0px 0px',
      fontSize: '15px',
      marginTop: '-15px !important'
    },
    '@media (max-width: 900px)': {
      padding: theme.direction === 'ltr' ? '0px 0px 0px 12px' : '0px 12px 0px 0px',
      fontSize: '12px',
      marginTop: '-10px !important'
    }
  },
  statusBoxStyles: {
    position: 'relative',
    boxShadow: '0px 1px 10px #00000011',
    borderRadius: '12px',
    width: '180px !important',
    height: '112px'
  }
}));

const ListStatusFilter = ({ recordingInfo }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  let info = [];

  for (const key in recordingInfo) {
    info = info.concat(
      <div className={classes.statusBoxStyles}>
        <h1 className={classes.countStyles}>{recordingInfo[key]}</h1>
        <Box className={classes.textTooltipContainer}>
          <h3 className={classes.statusTextStyles}>{t(key)}</h3>
        </Box>
      </div>
    );
  }
  return <div className={classes.container}>{info}</div>;
};
export default ListStatusFilter;
