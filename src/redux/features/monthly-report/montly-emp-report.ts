import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import API from "../../../config/axios.config";
import { IEmpMonthlyReport } from "../../../utils/interfaces";

export const fetchingEmpReport: any = createAsyncThunk(
  "monthlyReport",
  async () => {
    try {
      const { data } = await API.get(API_ENDPOINTS.GET_EMP_REPORT);
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  },
);

const empMontlyReportdata: IEmpMonthlyReport = {
  empMontlyReport: [],
  empMontlyReportdataloading: false,
  empMontlyReportdataerror: "",
  monthdate: "",
  editOpen: false,
  editChange: false,
  selectedDate: "",
  editOrAdd: "",
  submitData: [],
  saveButton: false,
  submitbutton: false,
  editButton: false,
  uniqueMonth: [],
  submitDate: "",
  editOn: false,
  reload: 0,
  checkdays: 0,
  buttonTorF: false,
};

//#region fetching the 9Box
export const empMontlyReportdataSl = createSlice({
  name: "nine",
  initialState: empMontlyReportdata,
  reducers: {
    reset: (state: IEmpMonthlyReport) => {
      state.empMontlyReportdataloading = true;
      state.empMontlyReport = [];
      state.empMontlyReportdataerror = "";
    },
    setMonthDate: (state, action) => {
      state.monthdate = action.payload;
    },
    setEditOpen: (state, action) => {
      state.editOpen = action.payload;
    },
    setChange: (state, action) => {
      state.editChange = action.payload;
    },
    setDateChange: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSubmitDate: (state, action) => {
      state.submitDate = action.payload;
    },
    setEdtiOn: (state, action) => {
      state.editOn = action.payload;
    },
    setString: (state, action) => {
      state.editOrAdd = action.payload;
    },

    setSubmitData: (state, action) => {
      state.submitData = action.payload;
    },
    setSaveButton: (state, action) => {
      state.saveButton = action.payload;
    },
    setsubmitbutton: (state) => {
      state.submitbutton = state.submitbutton ? false : true;
    },
    setEditButton: (state) => {
      state.editButton = state.editButton ? false : true;
    },
    setReload: (state, action) => {
      state.reload = action.payload;
    },
    setUniqueMonth: (state, action) => {
      state.uniqueMonth = action.payload;
    },
    setbuttonTorF: (state, action) => {
      state.buttonTorF = action.payload;
    },

    setCheckdays: (state, action) => {
      state.checkdays = action.payload;
    },
  },
  extraReducers: {
    [fetchingEmpReport.pending]: (state: IEmpMonthlyReport) => {
      state.empMontlyReportdataloading = true;
      state.empMontlyReport = [];
      state.empMontlyReportdataerror = "";
    },
    [fetchingEmpReport.fulfilled]: (state: IEmpMonthlyReport, action: any) => {
      state.empMontlyReportdataloading = false;
      state.empMontlyReport = action.payload.data;
    },
    [fetchingEmpReport.rejected]: (state: IEmpMonthlyReport, action: any) => {
      state.empMontlyReportdataloading = false;
      state.empMontlyReport = [];
      state.empMontlyReportdataerror = action.error;
    },
  },
});
//#endregion
export const {
  reset: resetempMontlyReportdataAction,
  setMonthDate,
  setEditOpen,
  setChange,
  setDateChange,
  setString,
  setSubmitData,
  setSaveButton,
  setsubmitbutton,
  setEditButton,
  setUniqueMonth,
  setSubmitDate,
  setEdtiOn,
  setReload,
  setCheckdays,
  setbuttonTorF,
} = empMontlyReportdataSl.actions;
export const empMontlyReportdataSlice = empMontlyReportdataSl.reducer;
