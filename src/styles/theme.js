import { createTheme } from '@mui/material/styles';

const palette = {
  purple: {
    main: '#20176c',
    bluegreen: '#29B3B4',
    light1: '#e3dfff',
    light2: '#f7f7fc'
  }
};

export const generateTheme = (direction = 'ltr', mode = 'light') => {
  return createTheme({
    direction: direction,
    palette: {
      mode: mode,
      common: {
        purple: palette.purple
      },
      primary: {
        main: palette.purple.main
      }
    },
    overrides: {},
    typography: {
      fontFamily: ['Bahij Janna', 'arial', 'sans-serif'].join(','),
      button: {
        textTransform: 'none'
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
            @font-face {
              font-family: 'Bahij Janna';
              src: url('/BahijJanna.woff2') format('woff2'),
              url('/BahijJanna.woff') format('woff');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }

            @font-face {
              font-family: 'Bahij Janna';
              src: url('/BahijJanna-Bold.woff2') format('woff2'),
              url('/BahijJanna-Bold.woff') format('woff');
              font-weight: bold;
              font-style: normal;
              font-display: swap;
            }
            
            body {
              background-color: ${mode === 'light' ? 'white' : 'rgb(45, 40, 103)'};
            }
            
            html {
              scroll-behavior: smooth;
              overflow-y: scroll;
            }
            
            .react-tel-input .selected-flag .flag {
              top: 43px;
            }
            
            .MuiFormLabel-root.Mui-focused:not(.Mui-error) {
              color: rgba(0, 0, 0, 0.87) !important;
            }
            
            .MuiFormGroup-root[role=radiogroup] + .MuiFormHelperText-root {
              margin-top: -5px;
            }
            
            .MuiPaper-root.MuiMenu-paper {
              max-height: 352px !important;
            }
            
            .MuiPaper-root:not([role="dialog"]) .MuiCheckbox-root {
              padding: 0 9px 0 0 !important;
            }
            
            .MuiFilledInput-root:not(.Mui-disabled) {
              background-color: white !important;
            }
            
            .MuiFilledInput-root:not(.Mui-disabled):hover {
              background-color: rgba(0, 0, 0, 0.09) !important;
            }
            
            .MuiFilledInput-root.Mui-focused {
              background-color: rgba(0, 0, 0, 0.06) !important;
            }
            
            .MuiInputBase-input:not(.Mui-error) {
                color: #37326D !important;
                -webkit-text-fill-color: #37326D !important;
            }
            
            .MuiInputLabel-root:not(.Mui-error) {
                color: #37326D !important;
                -webkit-text-fill-color: #37326D !important;
            }
            .MuiModal-root .MuiFilledInput-root {
              background-color: #F7F7FC !important;
            }
            .MuiLoadingButton-root {
              background-color: #6F4B99 !important;
              color: #FFFFFF !important;
            }
            .MuiLoadingButton-loading {
              background-color: #625B97 !important;
              color: rgba(255, 255, 255, 0.8) !important;
            }
            .MuiToggleButton-root {
              height: 18px !important;
              padding: 9px !important;
            }
            .Mui-selected {
              background-color: #B9B9EF !important;
            }

            .MuiFormGroup-root[role=radiogroup] {
              .MuiFormControlLabel-root {
                margin-right: 22px !important;
              }
              .MuiRadio-root {
                padding-right: 5px !important;
              }
            }
      `
      }
    }
  });
};
