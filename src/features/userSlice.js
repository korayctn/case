import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUSTYPE from "../utils/STATUSTYPE";
import axios from "axios";
import { authConfig } from "../utils/config";

const initialState = {
  user: null,
  userDetail: null,
  policyStatus: STATUSTYPE.IDLE,
  policyCoverages: [],
  selectedPolicyCoverage: null,
};

export const getPolicyCoverages = createAsyncThunk(
  "getUserDetail",
  async (user) => {
    const { data } = await axios.get(
      `https://api-dev.thebermuda.us/rating/api/rating/getPolicyCoverages?State=${user.address.state}`,
      authConfig
    );
    console.log(data);
    return data;
  }
);
const coveragesClearedData = (data) => {
  let products = [
    data.coverageProductsContainer[0].coverageProducts[0],
    data.coverageProductsContainer[0].coverageProducts[1],
  ];
  console.log(products);
  return products;
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToGlobalState: (state, action) => {
      const { firstName, lastName, address } = action.payload;
      state.user = {
        firstName,
        lastName,
        address,
      };
      console.log(state.user);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPolicyCoverages.fulfilled, (state, action) => {
      state.policyCoverages = coveragesClearedData(action.payload);
      state.policyStatus = STATUSTYPE.SUCCESS;
    });
    builder.addCase(getPolicyCoverages.pending, (state, action) => {
      state.policyStatus = STATUSTYPE.LOADING;
    });
    builder.addCase(getPolicyCoverages.rejected, (state, action) => {
      state.policyStatus = STATUSTYPE.ERROR;
    });
  },
});

export const { addToGlobalState } = userSlice.actions;
export default userSlice.reducer;
