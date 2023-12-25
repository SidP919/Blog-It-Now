import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import DeviceOrientationSlice from './slices/DeviceOrientationSlice';
import ThemeSlice from './slices/ThemeSlice';
import AlertSlice from './slices/AlertSlice';
import ApiLoadingSlice from './slices/ApiLoadingSlice';
import OtherDataSlice from './slices/OtherDataSlice';

export const Store = configureStore({
  reducer: {
    authState: AuthSlice,
    deviceOrientation: DeviceOrientationSlice,
    themeState: ThemeSlice,
    AlertState: AlertSlice,
    ApiLoadingState: ApiLoadingSlice,
    OtherDataState: OtherDataSlice,
  },
});
