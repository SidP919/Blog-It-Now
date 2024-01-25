import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  topBlogs: [],
};

const blogsDataSlice = createSlice({
  name: 'blogsData',
  initialState,
  reducers: {
    setTopBlogsData: (state, action) => {
      state.topBlogs = action.payload;
    },
  },
});

export const {setTopBlogsData} = blogsDataSlice.actions;

export const getTopBlogsData = state => state.blogsData.topBlogs;

export default blogsDataSlice.reducer;
