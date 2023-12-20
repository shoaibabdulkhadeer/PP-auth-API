import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IReportingMgrSl } from "../../../utils/interfaces";
export const GetReportingManagerData: any = createAsyncThunk(
  "getReportingManager",
  async () => {
    try {
      const { data } = await API.get(API_ENDPOINTS.RM_GET);
      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState: IReportingMgrSl = {
  reportingMRes: [],
  reportingMLoad: false,
  reportingMerror: "",
  rmOptions: [],
};

const ReportingMgrSl = createSlice({
  name: "getReportingManager",
  initialState: initialState,
  reducers: {
    reset: (state: any) => {
      state.reportingMerror = "";
      state.reportingMLoad = false;
      state.reportingMRes = [];
    },
  },

  extraReducers: {
    [GetReportingManagerData.pending]: (state: IReportingMgrSl) => {
      state.reportingMLoad = true;
    },

    [GetReportingManagerData.fulfilled]: (state: IReportingMgrSl, action) => {
      state.reportingMLoad = false;
      state.reportingMRes = action.payload.data;
      state.reportingMerror = "";
      // creating Reporting Manager Select Dropdown option
      state.rmOptions = [];
      for (let i = 0; i < state.reportingMRes?.length; i++) {
        const rmoption: any = state.reportingMRes[i];
        const value = `${rmoption.FullName}|${rmoption.EmployeeGuID}`;
        const label = rmoption.FullName;
        state.rmOptions.push({ value, label });
      }
    },

    [GetReportingManagerData.rejected]: (state: IReportingMgrSl, action) => {
      state.reportingMLoad = false;
      state.reportingMerror = action.payload.response.data.message;
      state.reportingMRes = [];
    },
  },
});

export const { reset: resetReportingMgrAction } = ReportingMgrSl.actions;
export const ReportingMgrSlice = ReportingMgrSl.reducer;
