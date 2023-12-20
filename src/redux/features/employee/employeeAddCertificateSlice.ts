import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IAddCertificateSl } from "../../../utils/interfaces";

//#region DEFINE INITIAL STATE FOR ADD CERTIFICATE POST
const initialState: IAddCertificateSl = {
  addCertResCode: 0,
  addCertificateDataLoading: false,
  addCertMsg: "",
};
//#endregion

//#region DEFINE ASYNCHRONOUS THUNK ACTION TO ADD EMPLOYEE CERTIFICATE
export const addEmployeeCertificate: any = createAsyncThunk(
  "addEmpCertificate/fetch",
  async (payload, thunkAPI) => {
    try {
      const { data } = await API.post(
        `${API_ENDPOINTS.CERTIFICATE_ADD_POST}`,
        payload,
      );

      return data;
    } catch (error: any) {
      const errorObject = {
        code: error?.response ? error.response.status : 500,
        message: error.response
          ? "Something went wrong please try again later"
          : "Internal server error!",
      };
      return errorObject;
    }
  },
);
//#endregion

//#region CREATE EMPLOYEE ADD CERTIFICATE SLICE
const EmpAddCertificateSl = createSlice({
  name: "addCertificates",
  initialState,
  reducers: {
    reset: (state: IAddCertificateSl) => {
      state.addCertResCode = 0;
      state.addCertificateDataLoading = false;
      state.addCertMsg = "";
    },
  },
  extraReducers: {
    [addEmployeeCertificate.pending]: (state: IAddCertificateSl) => {
      state.addCertificateDataLoading = true;
    },
    [addEmployeeCertificate.fulfilled]: (state: IAddCertificateSl, action) => {
      state.addCertificateDataLoading = false;
      if (action.payload.code) {
        state.addCertResCode = action?.payload?.code;
        state.addCertMsg = action?.payload?.message;
      }
    },
    [addEmployeeCertificate.rejected]: (state: IAddCertificateSl, action) => {
      state.addCertificateDataLoading = false;
      state.addCertMsg = action.payload.message;
      state.addCertResCode = action.payload.code;
    },
  },
});
//#endregion

export const { reset: resetAddCertificateAction } = EmpAddCertificateSl.actions;
export const EmpAddCertificateSlice = EmpAddCertificateSl.reducer;
