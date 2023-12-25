import {createSlice} from '@reduxjs/toolkit';
import {
  ifLandscapeMode,
  ifNativeLandscapeMode,
  ifWebLargeLandscapeMode,
  ifWebSmallLandscapeMode,
  ifWebTabletPortraitMode,
} from '../../utils/utils';

const initialState = {
  isLandscapeMode: ifLandscapeMode(),
  isWebLargeLandscapeMode: ifWebLargeLandscapeMode(),
  isWebSmallLandscapeMode: ifWebSmallLandscapeMode(),
  isWebTabletPortraitMode: ifWebTabletPortraitMode(),
  isNativeLandscapeMode: ifNativeLandscapeMode(),
};

const DeviceOrientationSlice = createSlice({
  name: 'deviceOrientation',
  initialState,
  reducers: {
    setIsLandscapeMode: (state, action) => {
      state.isLandscapeMode = action.payload.isLandscapeMode;
    },
    setIsWebLargeLandscapeMode: (state, action) => {
      state.isWebLargeLandscapeMode = action.payload.isWebLargeLandscapeMode;
    },
    setIsWebSmallLandscapeMode: (state, action) => {
      state.isWebSmallLandscapeMode = action.payload.isWebSmallLandscapeMode;
    },
    setIsWebTabletPortraitMode: (state, action) => {
      state.isWebTabletPortraitMode = action.payload.isWebTabletPortraitMode;
    },
    setIsNativeLandscapeMode: (state, action) => {
      state.isNativeLandscapeMode = action.payload.isNativeLandscapeMode;
    },
  },
});

export const {
  setIsLandscapeMode,
  setIsWebLargeLandscapeMode,
  setIsWebSmallLandscapeMode,
  setIsWebTabletPortraitMode,
  setIsNativeLandscapeMode,
} = DeviceOrientationSlice.actions;

export const getIsLandscapeMode = state =>
  state.deviceOrientation.isLandscapeMode;
export const getIsWebLargeLandscapeMode = state =>
  state.deviceOrientation.isWebLargeLandscapeMode;
export const getIsWebSmallLandscapeMode = state =>
  state.deviceOrientation.isWebSmallLandscapeMode;
export const getIsWebTabletPortraitMode = state =>
  state.deviceOrientation.isWebTabletPortraitMode;
export const getIsNativeLandscapeMode = state =>
  state.deviceOrientation.isNativeLandscapeMode;

export default DeviceOrientationSlice.reducer;
