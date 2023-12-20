import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEmpCsvReportSl } from "../../../utils/interfaces";

//#region DEFINE INITIAL STATE FOR EMPLOYEE MONTHLY PERFORMANCE CSV FREPORT
const initialState: IEmpCsvReportSl = {
  csvData: [],
  csvDataLoading: false,
  error: "",
};
//#endregion

//#region DEFINE ASYNCHRONOUS THUNK ACTION TO DOWNLOAD EMPLOYEE MONTHLY PERFORMANCE CSV REPORT
export const downloadEmployeeCsvReport: any = createAsyncThunk(
  "employeeDownloadCsv/download",
  async () => {
    try {
      const response = await API.get(
        `${API_ENDPOINTS.EMPLOYEE_DOWNLOAD_CSV_GET}`,
      );

      return response;
    } catch (error: any) {
      const errorObject = {
        code: error.response.status,
        message: error.response.data.message,
      };
      return errorObject;
    }
  },
);
//#endregion

//#region CREATE  DOWNLOAD EMPLOYEE MONTHLY PERFORMANCE CSV REPORT SLICE
const EmpDownloadCsvSl = createSlice({
  name: "employeeDownloadCsv",
  initialState,
  reducers: {
    reset: (state: IEmpCsvReportSl) => {
      state.csvData = [];

      state.csvDataLoading = false;

      state.error = "";
    },
  },
  extraReducers: {
    [downloadEmployeeCsvReport.pending]: (state: IEmpCsvReportSl) => {
      state.csvDataLoading = true;
    },
    [downloadEmployeeCsvReport.fulfilled]: (state: IEmpCsvReportSl, action) => {
      state.csvDataLoading = false;
      state.csvData = action.payload;
    },
    [downloadEmployeeCsvReport.rejected]: (state: IEmpCsvReportSl, action) => {
      state.csvDataLoading = false;
      state.error = action.error.message;
    },
  },
});
//#endregion

export const { reset: resetEmpDownloadCsvAction } = EmpDownloadCsvSl.actions;
export const EmpDownloadCsvSlice = EmpDownloadCsvSl.reducer;
