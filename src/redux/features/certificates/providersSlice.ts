import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

//#region fetching certificate providers
export const fetchCertificateProviders: any = createAsyncThunk(
  "providers/fetch",
  async () => {
    try {
      const provData = await API.get(API_ENDPOINTS.GET_CERTIFICATES_PROVIDERS);
      return provData;
    } catch (error: any) {
      return error.response;
    }
  },
);
//#endregion

const initialState = {
  providers: [],
  isLoading: false,
  error: "",
};

const certProviders = createSlice({
  name: "providers",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.provideData = [];
      state.isLoading = false;
    },
  },
  extraReducers: {
    [fetchCertificateProviders.fulfilled]: (state: any, action) => {
      state.provideData = action.payload;
      state.isLoading = false;
    },
    [fetchCertificateProviders.pending]: (state: any, action) => {
      state.provideData = [];
      state.isLoading = true;
    },
    [fetchCertificateProviders.rejected]: (state: any, action) => {
      state.provideData = [];
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const providersSlice = certProviders.reducer;
