import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IaddMonthlyReport } from "../../../utils/interfaces";

export const addMonthlyReport: any = createAsyncThunk(
  "addMonthlyReports",
  async (addMonthlyReport) => {
    try {
      const { data } = await API.post(
        API_ENDPOINTS.ADD_EMP_REPORT,
        addMonthlyReport,
      );

      return data;
    } catch (error) {
      return error;
    }
  },
);
//redux data
const addMonthlyReportData: IaddMonthlyReport = {
  addMonthlyReport: [],
  addMonthlyReportloading: false,
  addMonthlyReporterror: "",
  loadingClose: false,
  submitBoolean: false,
  fileds: false,
  submitDatee: 0,
};

//#region fetching the addmonthreport
export const addMonthlyReportSl = createSlice({
  name: "addMonthlyReports",
  initialState: addMonthlyReportData,
  reducers: {
    reset: (state: IaddMonthlyReport) => {
      state.addMonthlyReportloading = true;
      state.addMonthlyReport = [];
      state.addMonthlyReporterror = "";
    },
    setloadingClose: (state, action) => {
      state.loadingClose = action.payload;
    },
    setsubmitBoolean: (state, action) => {
      state.submitBoolean = action.payload;
    },

    setsubmitDate: (state, action) => {
      state.submitDatee = action.payload;
    },
    setFildes: (state, action) => {
      state.fileds = action.payload;
    },
  },
  extraReducers: {
    [addMonthlyReport.pending]: (state: IaddMonthlyReport) => {
      state.addMonthlyReportloading = true;
      state.addMonthlyReport = [];
      state.addMonthlyReporterror = "";
    },
    [addMonthlyReport.fulfilled]: (state: IaddMonthlyReport, action: any) => {
      state.addMonthlyReportloading = false;
      state.addMonthlyReport = action.payload.data;
    },
    [addMonthlyReport.rejected]: (state: IaddMonthlyReport, action: any) => {
      state.addMonthlyReportloading = false;
      state.addMonthlyReport = [];
      state.addMonthlyReporterror = action.error.message;
    },
  },
});
//#endregion

export const {
  reset: resetNineBoxAction,
  setloadingClose,
  setsubmitBoolean,
  setFildes,
  setsubmitDate,
} = addMonthlyReportSl.actions;
export const addMonthlyReportSlice = addMonthlyReportSl.reducer;
