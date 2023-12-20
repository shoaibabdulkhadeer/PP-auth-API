import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IexportMonthReport } from "../../../utils/interfaces";
import { decode } from "../../../common/common";

function formatMonthYear(dateStr: any) {
  const date = new Date(dateStr);
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${month}_${year}`;
}
export const exportMonthlyReport: any = createAsyncThunk(
  "downloadMontlyReport",
  async (date: any) => {
    try {
      const datee = formatMonthYear(date.ForMonth);
      const token = sessionStorage.getItem("token");
      const tokenData: any = decode(token);
      const { myDecodedToken }: any = tokenData;
      const { FullName } = myDecodedToken;
      const { data } = await API.post(API_ENDPOINTS.EXPORT_MONTH_REPORT, date, {
          responseType: "text",
        }),
        filename = `EmployeesReport_${datee}_${FullName}.csv`,
        blob = new Blob([data], { type: "text/csv" }),
        url = window.URL.createObjectURL(blob),
        a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);

      return data;
    } catch (error) {
      return error;
    }
  },
);

const exportMonthReportData: IexportMonthReport = {
  exportMonthReport: [],
  exportMonthReportloading: false,
  exportMonthReporterror: "",
};

//#region Exportmonthreport
export const exportMonthReportDataSl = createSlice({
  name: "downloadMontlyReport",
  initialState: exportMonthReportData,
  reducers: {
    reset: (state: IexportMonthReport) => {
      state.exportMonthReportloading = true;
      state.exportMonthReport = [];
      state.exportMonthReporterror = "";
    },
  },
  extraReducers: {
    [exportMonthlyReport.pending]: (state: IexportMonthReport) => {
      state.exportMonthReportloading = true;
      state.exportMonthReport = [];
      state.exportMonthReporterror = "";
    },
    [exportMonthlyReport.fulfilled]: (
      state: IexportMonthReport,
      action: any,
    ) => {
      state.exportMonthReportloading = false;
      state.exportMonthReport = action.payload.data;
    },
    [exportMonthlyReport.rejected]: (
      state: IexportMonthReport,
      action: any,
    ) => {
      state.exportMonthReportloading = false;
      state.exportMonthReport = [];
      state.exportMonthReporterror = action.error.message;
    },
  },
});
//#endregion

export const { reset: resetNineBoxAction } = exportMonthReportDataSl.actions;
export const exportMonthReportDataSlice = exportMonthReportDataSl.reducer;
