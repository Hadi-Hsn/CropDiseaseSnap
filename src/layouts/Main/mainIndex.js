// libs
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// material ui
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Divider, Drawer, IconButton, ListItemButton } from '@mui/material';

// actions
import { AppActions } from '../../store/actions';

// selectors
import { languageSelector, metaDataSelector } from '../../store/selectors';

// util
import buildAction from '../../util/buildAction';
import useCheckScreenSize from '../../util/useCheckScreenSize';

//constants
import { ROUTES_PATH } from '../../constants/routesPath';

// assets
import logo from '../../assets/logo.png';
import { parseJwt } from '../../util/parseJwt';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  header: {
    top: '0',
    margin: '0 auto',
    backgroundColor:
      theme.palette.mode === 'light' ? 'rgb(255,255,255,0.95)' : 'rgba(45, 40, 103, 0.95)',
    zIndex: 15,
    backdropFilter: 'blur(5px)',
    position: 'sticky',
    '@media (max-width: 480px)': {
      maxWidth: '480px',
      padding: '0 15px'
    },
    '@media (min-width: 480px) and (max-width: 1280px)': {
      maxWidth: '1100px',
      padding: '0 40px'
    }
  },
  staticHeader: {
    position: 'static'
  },
  horizontalContainer: {
    maxWidth: '1256px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 480px)': {
      maxWidth: '480px'
    }
  },
  headerBottom: {
    display: 'flex',
    alignItems: 'center',
    gap: '36px',
    '@media (max-width: 480px)': {
      gap: '10px',
      maxWidth: '480px'
    },
    '@media (min-width: 480px) and (max-width: 1280px)': {
      maxWidth: '1100px'
    }
  },
  headerLink: {
    paddingLeft: '7px !important',
    paddingRight: '7px !important',
    color: theme.palette.mode === 'light' ? '#1F166C' : 'white',
    fontSize: '18px',
    textDecoration: 'none',
    '&:nth-of-type(1)': {
      marginLeft: theme.direction === 'ltr' ? 'auto' : 'initial',
      marginRight: theme.direction === 'rtl' ? 'auto' : 'initial'
    },
    '@media (max-width: 1085px)': {
      display: 'none'
    }
  },
  headerLinkRegular: {
    fontSize: '17px',
    color: theme.palette.mode === 'light' ? '#3E437A' : 'white',
    '@media (max-width: 1085px)': {
      display: 'none'
    }
  },
  headerLinkBold: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: theme.palette.mode === 'light' ? '#3E437A' : 'white',
    '@media (max-width: 1085px)': {
      display: 'none'
    }
  },
  headerBottomButton: {
    backgroundColor: theme.palette.mode === 'light' ? '#6F4B99' : '#DFDFFF',
    fontSize: '16px',
    color: theme.palette.mode === 'light' ? 'white' : '#37326D',
    border: '0',
    borderRadius: '4px',
    padding: '8px 34px',
    cursor: 'pointer',
    fontFamily: ['Bahij Janna', 'arial', 'sans-serif'].join(','),
    '&:hover': {
      background: theme.palette.mode === 'light' ? '#5B318B' : '#D1D1FF'
    },
    '&:focus': {
      background: theme.palette.mode === 'light' ? '#5B318B' : '#D1D1FF',
      border: theme.palette.mode === 'light' ? `#7435BC` : `#CCCCF8`
    },
    '&:disabled': {
      background: theme.palette.mode === 'light' ? '#9980B7' : '#E8E8FF',
      color: theme.palette.mode === 'light' ? '#EDDEFF' : '#A7A3D9'
    },
    '@media (max-width: 1085px)': {
      display: 'none'
    }
  },
  imageBtnContainer: {
    alignSelf: 'flex-end',
    '@media (max-width: 480px)': {
      alignSelf: 'center',
      margin: theme.direction === 'rtl' ? '5px 0px 0px 5px' : '5px 5px 0px 0px'
    }
  },
  logo: {
    width: 'auto',
    height: '85px',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    },
    '@media (max-width: 756px)': {
      marginTop: '10px',
      width: '185px',
      height: '56px'
    },
    '@media (max-width: 480px)': {
      width: 'auto',
      height: '40px'
    }
  },
  burgerMenuIcon: {
    display: 'none !important',
    '@media (max-width: 1085px)': {
      display: 'block !important'
    }
  },
  burgerMenu: {
    '& .MuiPaper-root': {
      width: '70% !important',
      display: 'none !important',
      '@media (max-width: 1085px)': {
        display: 'block !important'
      }
    }
  },
  toggleButtonStyle: {
    width: '74px',
    margin: 'auto !important',
    '& .Mui-selected': {
      backgroundColor: '#E3E3FF 0% 0% no-repeat padding-box !important'
    }
  },
  toggleButtonTextEn: {
    fontSize: '13px !important',
    fontWeight: 'bold !important',
    position: 'absolute !important',
    top: '4px !important'
  },
  toggleButtonTextAr: {
    fontSize: '15px !important',
    fontWeight: 'bold !important',
    position: 'absolute !important',
    top: '0px !important'
  },
  toggleStylesEn: {
    '& .MuiToggleButton-root': {
      height: '30px !important',
      padding: '0 !important'
    },
    '& .Mui-selected': {
      backgroundColor: '#E3E3FF !important'
    },
    margin: '18px 24px 10px 24px !important'
  },
  toggleStylesAr: {
    '& .MuiToggleButton-root': {
      height: '30px !important',
      padding: '0 !important'
    },
    '& .Mui-selected': {
      backgroundColor: '#E3E3FF !important'
    },
    margin: '18px 24px 10px 24px !important'
  },
  burgerMenuItem: {
    font: 'normal normal normal 15px Bahij Janna',
    color: '#3E437A !important',
    margin: '0px'
  },
  burgerMenuItem2: {
    background: '#6F4B99 0% 0% no-repeat padding-box !important',
    color: '#FFFFFF !important'
  },
  logoTransition: {
    WebkitTransition: 'width .1s, height .1s',
    transition: 'width .1s, height .1s'
  },
  collapsedLogo: {
    width: '145.48px',
    height: '58.5px',
    marginTop: '17px',
    marginBottom: '7px',
    '@media (max-width: 480px)': {
      width: '105px',
      height: '50px',
      margin: '0px 0px'
    }
  }
}));

function MainLayout(props) {
  const { children } = props;
  const classes = useStyles();
  const { t: translate, i18n } = useTranslation();
  const language = useSelector(languageSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const metaData = useSelector(metaDataSelector);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const matchesMobileScreen = useCheckScreenSize(480);
  let userRole = parseJwt(metaData)?.[Object?.keys(parseJwt(metaData))?.[5]];

  const toggleBurgerMenu = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    //changes the function state according to the value of open
    setBurgerMenuOpen(isOpen);
  };

  const selectLanguage = (language) => {
    i18n.changeLanguage(language);
    dispatch(buildAction(AppActions.SET_LANGUAGE, language));
    window.localStorage.setItem('language', language);
  };

  const navigateToHome = (event) => {
    event.preventDefault();
    navigate(ROUTES_PATH.HOME);
    setBurgerMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navigateToSignUp = (event) => {
    event.preventDefault();
    navigate(ROUTES_PATH.SIGN_UP);
    setBurgerMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navigateToSignIn = (event) => {
    event.preventDefault();
    navigate(ROUTES_PATH.SIGN_IN);
    window.localStorage.clear();
    dispatch(buildAction(AppActions.SET_META_DATA, ''));
    setBurgerMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    setBurgerMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={classes.root} onClick={() => (dropdownOpen ? toggleDropdown() : null)}>
      <div
        className={
          matchesMobileScreen ? `${classes.header} ${classes.staticHeader}` : classes.header
        }>
        <div className={classes.horizontalContainer}>
          <a href="/" target="_blank" onClick={null} className={classes.imageBtnContainer}>
            <img
              src={logo}
              alt={translate('AUB')}
              className={`${`${!matchesMobileScreen && classes.logoTransition} ${classes.logo}`} ${
                classes.collapsedLogo
              }`}
            />
          </a>
          <div>
            <div className={classes.headerBottom}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleBurgerMenu(true)}
                className={classes.burgerMenuIcon}>
                <MenuIcon style={{ fontSize: 35 }} />
              </IconButton>
              <Drawer
                className={classes.burgerMenu}
                anchor="right"
                open={burgerMenuOpen}
                onClose={toggleBurgerMenu(false)}>
                <Box
                  sx={{
                    backgroundColor: '#FFFFFF'
                  }}>
                  <CloseIcon
                    sx={{
                      float: 'right',
                      height: '32px',
                      width: '32px',
                      margin: '12px 20px !important',
                      cursor: 'pointer'
                    }}
                    onClick={toggleBurgerMenu(false)}
                  />
                  {userRole !== 'Admin' && (
                    <>
                      <ToggleButtonGroup
                        value={language}
                        exclusive
                        onClick={() => selectLanguage(language === 'en' ? 'ar' : 'en')}
                        dir={language === 'en' ? 'ltr' : 'rtl'}
                        className={
                          language === 'en' ? classes.toggleStylesEn : classes.toggleStylesAr
                        }>
                        <ToggleButton value="en" className={classes.toggleButtonStyle}>
                          <Typography className={classes.toggleButtonTextEn}>English</Typography>
                        </ToggleButton>
                        <ToggleButton value="ar" className={classes.toggleButtonStyle}>
                          <Typography className={classes.toggleButtonTextAr}>عربي</Typography>
                        </ToggleButton>
                      </ToggleButtonGroup>
                      <Divider sx={{ mb: 2, mt: 1.5, ml: 2, mr: 2 }} />
                    </>
                  )}
                  <Box>
                    {metaData && (
                      <>
                        <ListItemButton href="#" onClick={navigateToHome}>
                          <p className={classes.burgerMenuItem}>{translate('HOME')}</p>
                        </ListItemButton>
                        <ListItemButton
                          href="#"
                          onClick={navigateToSignIn}
                          className={classes.burgerMenuItem}>
                          {translate('SIGN_OUT')}
                        </ListItemButton>
                      </>
                    )}

                    {!metaData && (
                      <>
                        <ListItemButton
                          href="#"
                          onClick={navigateToSignIn}
                          className={classes.burgerMenuItem}>
                          {translate('SIGN_IN')}
                        </ListItemButton>
                        <ListItemButton
                          className={classes.burgerMenuItem2}
                          onClick={navigateToSignUp}>
                          {translate('SIGN_UP')}
                        </ListItemButton>
                      </>
                    )}
                  </Box>
                </Box>
              </Drawer>
              {userRole !== 'Admin' && (
                <a
                  href="#"
                  onClick={() => selectLanguage(language === 'en' ? 'ar' : 'en')}
                  className={`${classes.headerLink} ${classes.headerLinkBold}`}>
                  {translate('LANGUAGE_SELECTOR')}
                </a>
              )}
              {metaData && (
                <>
                  {userRole !== 'Admin' && (
                    <a
                      href="#"
                      onClick={navigateToHome}
                      className={`${classes.headerLink} ${classes.headerLinkRegular}`}>
                      {translate('HOME')}
                    </a>
                  )}
                  <button className={classes.headerBottomButton} onClick={navigateToSignIn}>
                    {translate('SIGN_OUT')}
                  </button>
                </>
              )}
              {!metaData && (
                <>
                  <a
                    href="#"
                    onClick={navigateToSignIn}
                    className={`${classes.headerLink} ${classes.headerLinkRegular}`}>
                    {translate('SIGN_IN')}
                  </a>

                  <button className={classes.headerBottomButton} onClick={navigateToSignUp}>
                    {translate('SIGN_UP')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default MainLayout;
