import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  authData: {username: '', fullname: '', email: '', favoriteContent: ''},
};

const AuthSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.authData = action.payload.authData;
    },
    resetLoginState: (state, action) => {
      state.isLoggedIn = false;
      state.authData = initialState.authData;
    },
  },
});

export const {setLoginState, resetLoginState} = AuthSlice.actions;
export const getIsLoggedIn = state => state.authState.isLoggedIn;
export const getAuthData = state => state.authState.authData;

export default AuthSlice.reducer;
