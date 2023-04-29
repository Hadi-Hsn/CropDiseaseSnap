import { createSelector } from 'reselect';

const appState = (state) => state.app;

export const languageSelector = createSelector(appState, (state) => {
  return state.language;
});

export const themeSelector = createSelector(appState, (state) => {
  return state.theme;
});

export const metaDataSelector = createSelector(appState, (state) => {
  return state.metaData;
});
