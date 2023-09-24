import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUSTYPE from "../utils/STATUSTYPE";

const initialState = {
  user: {},
  userStatus: STATUSTYPE.IDLE,
};

export const getUser = createAsyncThunk("getUser", async () => {});
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUser.pending, (state, action) => {
      state.userStatus = STATUSTYPE.LOADING;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.userStatus = STATUSTYPE.ERROR;
    });
  },
});

export default productSlice.reducer;
