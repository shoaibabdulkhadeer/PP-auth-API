import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEmplCertificateSl } from "../../../utils/interfaces";

//#region DEFINE INITIAL STATE FOR EMPLOYEE CERTIFICATES DATA
const initialState: IEmplCertificateSl = {
  certificateData: [],
  certificateDataLoading: false,
  error: "",
};
//#endregion

//#region DEFINE ASYNCHRONOUS THUNK ACTION TO FETCH EMPLOYEE CERTIFICATE BY ID
export const fetchCertificatesById: any = createAsyncThunk(
  "employeeCertificates/fetch",
  async () => {
    try {
      const response = await API.post(
        `${API_ENDPOINTS.EMPLOYEE_CERTIFICATE_GET}`,
      );
      return response.data;
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

//#region CREATE EMPLOYEE CERTIFICATE SLICE
const EmpCertificateSl = createSlice({
  name: "employeeCertificates",
  initialState,
  reducers: {
    reset: (state: IEmplCertificateSl) => {
      state.certificateData = [];

      state.certificateDataLoading = false;

      state.error = "";
    },
  },
  extraReducers: {
    [fetchCertificatesById.pending]: (state: IEmplCertificateSl) => {
      state.certificateDataLoading = true;
    },
    [fetchCertificatesById.fulfilled]: (state: IEmplCertificateSl, action) => {
      state.certificateDataLoading = false;
      if (action.payload.code === 200) {
        state.certificateData = action.payload;
      } else {
        state.certificateData = [];
      }
    },
    [fetchCertificatesById.rejected]: (state: IEmplCertificateSl, action) => {
      state.certificateDataLoading = false;
      state.error = action.error.message;
    },
  },
});
//#endregion

export const { reset: resetEmpCertificateAction } = EmpCertificateSl.actions;
export const EmpGetCertificateSlice = EmpCertificateSl.reducer;
