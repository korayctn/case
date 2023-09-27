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
    return data;
  }
);
const coveragesClearedData = (data) => {
  const stateMinCoverage =
    data.coverageProductsContainer[0].coverageProducts[0];
  const enhancedCoverage =
    data.coverageProductsContainer[0].coverageProducts[1];

  const premiumCoverage = {
    productType: 1,
    detail:
      "Pays to repair or replace your car after an accident and comprehensive (other than collision) coverage, which pays if your car is stolen or damaged by fire, flood, vandalism or something other than a collision. You select the deductible that you pay for your comprehensive and collision coverage",
    description: "Premium Coverage",
    coverages: data.customCoverages,
  };
  let products = [stateMinCoverage, enhancedCoverage, premiumCoverage];
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
    },
    selectThePolicy: (state, action) => {
      const { idx, datax } = action.payload;
      state.selectedPolicyCoverage = {
        id: idx,
        data: datax,
      };
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

export const { addToGlobalState, selectThePolicy } = userSlice.actions;
export default userSlice.reducer;
