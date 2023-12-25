import {createSlice} from '@reduxjs/toolkit';
import {LIGHT_THEME, THEME_COLOR_ORANGE} from '../../utils/constants';

const initialState = {
  theme: LIGHT_THEME,
  color: THEME_COLOR_ORANGE,
};

const ThemeSlice = createSlice({
  name: 'themeState',
  initialState,
  reducers: {
    setAppTheme: (state, action) => {
      state.theme = action.payload.theme;
      state.color = action.payload.color;
    },
  },
});

export const {setAppTheme} = ThemeSlice.actions;

export const getAppTheme = state => state.themeState.theme;
export const getAppColor = state => state.themeState.color;

export default ThemeSlice.reducer;
