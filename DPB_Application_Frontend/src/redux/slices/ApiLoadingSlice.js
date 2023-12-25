import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isApiLoading: false,
};

const ApiLoadingSlice = createSlice({
  name: 'ApiLoadingState',
  initialState,
  reducers: {
    setIsApiLoading: (state, action) => {
      state.isApiLoading = action.payload;
    },
  },
});

export const {setIsApiLoading} = ApiLoadingSlice.actions;
export const getIsApiLoading = state => state.ApiLoadingState.isApiLoading;
export default ApiLoadingSlice.reducer;
