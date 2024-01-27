import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  topBlogs: [],
  myBlogs: [],
};

const blogsDataSlice = createSlice({
  name: 'blogsData',
  initialState,
  reducers: {
    setTopBlogsData: (state, action) => {
      state.topBlogs = action.payload;
    },
    setMyBlogsData: (state, action) => {
      state.myBlogs = action.payload;
    },
  },
});

export const {setTopBlogsData, setMyBlogsData} = blogsDataSlice.actions;

export const getTopBlogsData = state => state.blogsData.topBlogs;
export const getMyBlogsData = state => state.blogsData.myBlogs;

export default blogsDataSlice.reducer;
