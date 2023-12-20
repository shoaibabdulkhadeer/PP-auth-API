import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEditMonthlyReport } from "../../../utils/interfaces";

export const EditMonthlyReport: any = createAsyncThunk(
  "EditMonthlyReport",
  async (editData: any) => {
    try {
      editData.MonthlyPerformanceInfoGuId = editData.key;
      delete editData.key;
      const { data } = await API.put(API_ENDPOINTS.EDIT_EMP_REPORT, editData);

      return data;
    } catch (error) {
      return error;
    }
  },
);

const EditMonthlyReportData: IEditMonthlyReport = {
  EditMonthlyReport: [],
  EditMonthlyReportloading: false,
  EditMonthlyReporterror: "",
};

//#region fetching the 9Box
export const EditMonReport = createSlice({
  name: "EditMonthlyReport",
  initialState: EditMonthlyReportData,
  reducers: {
    reset: (state: IEditMonthlyReport) => {
      state.EditMonthlyReportloading = true;
      state.EditMonthlyReport = [];
      state.EditMonthlyReporterror = "";
    },
  },
  extraReducers: {
    [EditMonthlyReport.pending]: (state: IEditMonthlyReport) => {
      state.EditMonthlyReportloading = true;
      state.EditMonthlyReport = [];
      state.EditMonthlyReporterror = "";
    },
    [EditMonthlyReport.fulfilled]: (state: IEditMonthlyReport, action: any) => {
      state.EditMonthlyReportloading = false;
      state.EditMonthlyReport = action.payload.data;
    },
    [EditMonthlyReport.rejected]: (state: IEditMonthlyReport, action: any) => {
      state.EditMonthlyReportloading = false;
      state.EditMonthlyReport = [];
      state.EditMonthlyReporterror = action.error.message;
    },
  },
});
//#endregion

export const { reset: resetNineBoxAction } = EditMonReport.actions;
export const EditMonReportSlice = EditMonReport.reducer;
