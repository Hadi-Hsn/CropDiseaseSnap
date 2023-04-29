// libs
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

// material-ui
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// styles
import { generateTheme } from './styles/theme';

// routes
import Routes from './routing';

// lang
import './lang/i18n';

// selectors
import { languageSelector, themeSelector } from './store/selectors';

// components
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// utils
import { CustomAlert } from './components/common/CustomAlert';

const cacheLtr = createCache({
  key: 'muiltr'
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin]
});

const alertOptions = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '15px',
  transition: transitions.SCALE
};

const App = () => {
  const language = useSelector(languageSelector);
  const themeMode = useSelector(themeSelector);

  React.useLayoutEffect(() => {
    document.body.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  const theme = generateTheme(language === 'ar' ? 'rtl' : 'ltr', themeMode);

  return (
    <CacheProvider value={language === 'ar' ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertProvider template={CustomAlert} {...alertOptions}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AlertProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
