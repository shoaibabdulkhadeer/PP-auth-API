import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

//#region fetching certificates
export const fetchCertificates: any = createAsyncThunk(
  "certificates/fetch",
  async (filter: any) => {
    try {
      const { page, name } = filter;
      const certData = await API.get(
        `${
          API_ENDPOINTS.MASTER_GET_CERTIFICATES
        }?page=${page}&name=${name.trim()}`,
      );
      return certData;
    } catch (error: any) {
      return error.response;
    }
  },
);
//#endregion

const initialState = {
  data: [],
  count: 0,
  isLoading: false,
  error: "",
};

const certification = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.data = [];
      state.isLoading = false;
    },
  },
  extraReducers: {
    [fetchCertificates.pending]: (state: any) => {
      state.data = [];
      state.isLoading = true;
    },
    [fetchCertificates.fulfilled]: (state: any, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.count = action.payload?.data?.data?.totalCertificatesCount;
    },
    [fetchCertificates.rejected]: (state: any, action) => {
      state.data = [];
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const certificateSlice = certification.reducer;
