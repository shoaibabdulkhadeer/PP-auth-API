import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IFetchAllCertificateSl } from "../../../utils/interfaces";

//#region DEFINE INITIAL STATE FOR FETCH ALL CERTIFICATE
const initialState: IFetchAllCertificateSl = {
  allCertificateData: [],
  allCertificateDataLoading: false,
  error: "",
};
//#endregion

//#region DEFINE ASYNCHRONOUS THUNK ACTION TO FETCH ALL CERTIFICATES
export const fetchAllCertificates: any = createAsyncThunk(
  "employeeAllCertificates/fetch",
  async () => {
    try {
      const response = await API.get(
        `${API_ENDPOINTS.EMPLOYEE_ALL_CERTIFICATE_GET}`,
      );
      return response.data.data;
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

//#region CREATE EMPLOYEE ALL CERTIFICATE SLICE
const EmpAllCertificateSl = createSlice({
  name: "allCertificates",
  initialState,
  reducers: {
    reset: (state: IFetchAllCertificateSl) => {
      state.allCertificateData = [];

      state.allCertificateDataLoading = false;

      state.error = "";
    },
  },
  extraReducers: {
    [fetchAllCertificates.pending]: (state: IFetchAllCertificateSl) => {
      state.allCertificateDataLoading = true;
    },
    [fetchAllCertificates.fulfilled]: (
      state: IFetchAllCertificateSl,
      action,
    ) => {
      state.allCertificateDataLoading = false;
      if (action.payload.code !== 500) {
        state.allCertificateData = action.payload;
      } else {
        state.allCertificateData = [];
      }
    },
    [fetchAllCertificates.rejected]: (
      state: IFetchAllCertificateSl,
      action,
    ) => {
      state.allCertificateDataLoading = false;
      state.error = action.error.message;
    },
  },
});
//#endregion

export const { reset: resetAllCertificateAction } = EmpAllCertificateSl.actions;
export const EmpAllCertificateSlice = EmpAllCertificateSl.reducer;
