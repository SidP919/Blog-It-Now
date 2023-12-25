import {createSlice} from '@reduxjs/toolkit';
import {GENERIC_ERROR_TITLE, GENERIC_ERROR_MSG} from '../../utils/content';
import {GENERIC} from '../../utils/utils';

const initialState = {
  showAlert: false,
  title: GENERIC_ERROR_TITLE,
  msg: GENERIC_ERROR_MSG,
  callbackType: GENERIC,
};

const AlertSlice = createSlice({
  name: 'AlertState',
  initialState,
  reducers: {
    setAlertData: (state, action) => {
      state.showAlert = !state.showAlert;
      state.title = action.payload.title;
      state.msg = action.payload.msg;
      state.callbackType = action.payload.callbackType;
    },
    resetAlertData: state => {
      state.showAlert = false;
      state.title = GENERIC_ERROR_TITLE;
      state.msg = GENERIC_ERROR_MSG;
      state.callbackType = GENERIC;
    },
  },
});

export const {setAlertData, resetAlertData} = AlertSlice.actions;

export const getAlertData = state => state.AlertState;

export default AlertSlice.reducer;
