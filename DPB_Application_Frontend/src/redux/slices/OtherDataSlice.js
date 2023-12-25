import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  androidDownloadLink: null,
  iosDownloadLink: null,
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
  },
});

export const {setAndroidDownloadLink, setIosDownloadLink} =
  OtherDataSlice.actions;

export const getAndroidDownloadLink = state =>
  state.OtherDataState.androidDownloadLink;
export const getIosDownloadLink = state => state.OtherDataState.iosDownloadLink;

export default OtherDataSlice.reducer;
