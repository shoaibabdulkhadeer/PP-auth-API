import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { MasterCertificate } from "../../../utils/interfaces";

//#region adding certificates
export const addCertificate: any = createAsyncThunk(
  "certificates/add",
  async (data: MasterCertificate) => {
    try {
      delete data.CertificationGuId;
      delete data.CertificationProvider;
      const certData = await API.post(
        API_ENDPOINTS.MASTER_ADD_CERTIFICATES,
        data,
      );
      return certData;
    } catch (error: any) {
      return error.response;
    }
  },
);

const initialState = {
  addData: [],
  addload: false,
  error: "",
};

const addCertification = createSlice({
  name: "addCertificates",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.addData = [];
      state.addload = false;
      state.error = "";
    },
  },
  extraReducers: {
    [addCertificate.fulfilled]: (state: any, action) => {
      state.addData = action.payload;
      state.addload = false;
    },
    [addCertificate.pending]: (state: any) => {
      state.addData = [];
      state.addload = true;
    },
    [addCertificate.rejected]: (state: any, action) => {
      state.addData = [];
      state.addload = false;
      state.error = action.error;
    },
  },
});

export const AddCertificateSlice = addCertification.reducer;
