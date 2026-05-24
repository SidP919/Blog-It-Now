import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  androidDownloadLink: null,
  iosDownloadLink: null,
  welcomeQuote: null,
  blogCategories: null,
};

const OtherDataSlice = createSlice({
  name: 'otherDataState',
  initialState,
  reducers: {
    setAndroidDownloadLink: (state, action) => {
      state.androidDownloadLink = action.payload;
    },
    setIosDownloadLink: (state, action) => {
      state.iosDownloadLink = action.payload;
    },
    setWelcomeQuote: (state, action) => {
      state.welcomeQuote = action.payload;
    },
    setBlogCategories: (state, action) => {
      state.blogCategories = action.payload;
    },
  },
});

export const {
  setAndroidDownloadLink,
  setIosDownloadLink,
  setWelcomeQuote,
  setBlogCategories,
} = OtherDataSlice.actions;

export const getAndroidDownloadLink = state =>
  state.OtherDataState.androidDownloadLink;
export const getIosDownloadLink = state => state.OtherDataState.iosDownloadLink;
export const getWelcomeQuote = state => state.OtherDataState.welcomeQuote;
export const getBlogCategories = state => state.OtherDataState.blogCategories;

export default OtherDataSlice.reducer;
