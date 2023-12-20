import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { MasterCertificate } from "../../../utils/interfaces";

//#region updating certificatres
export const updateCertificate: any = createAsyncThunk(
  "certificates/update",
  async (data: MasterCertificate) => {
    try {
      delete data.CertificationProvider;
      const id = data.CertificationGuId;
      delete data.CertificationGuId;
      const res = await API.patch(
        `${API_ENDPOINTS.MASTER_UPDATE_CERTIFICATES}/${id}`,
        data,
      );
      return res;
    } catch (error: any) {
      return error.response;
    }
  },
);
//#endregion

const initialState = {
  updateData: [],
  updateload: false,
  error: "",
};

const updateCertification = createSlice({
  name: "addCertificates",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.updateData = [];
      state.updateload = false;
      state.error = "";
    },
  },
  extraReducers: {
    [updateCertificate.fulfilled]: (state: any, action) => {
      state.updateData = action.payload;
      state.updateload = false;
    },
    [updateCertificate.pending]: (state: any) => {
      state.updateData = [];
      state.updateload = true;
    },
    [updateCertificate.rejected]: (state: any, action) => {
      state.updateData = [];
      state.updateload = false;
      state.error = action.error;
    },
  },
});

export const UpdateCertificateSlice = updateCertification.reducer;
