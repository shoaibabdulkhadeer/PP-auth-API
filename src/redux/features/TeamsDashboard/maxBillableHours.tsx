import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { decode } from "../../../common/common";
//#region for getting max billable hours of previousmonth
export const getMaxBillableHours: any = createAsyncThunk(
  "/api/billablehours?DepartmentId=id",
  async (deptid: any) => {
    const userdata = decode(sessionStorage.getItem("token"));
    const { myDecodedToken }: any = userdata;
    const { DepartmentId } = myDecodedToken;
    if (typeof deptid === "undefined") {
      deptid = DepartmentId;
    }
    try {
      const response = await API.get(
        `${API_ENDPOINTS.MAX_BILLABLEHOURS_PREVIOUS_MONTH}?DepartmentId=${deptid}`,
      );

      return response;
    } catch (error) {
      return error;
    }
  },
);
//#endregion
interface MaxBillableHoursType {
  BillableHours: number;
  ForMonth: any;
  FullName: string;
  NonBillableHours: number;
}

interface NineBoxData {
  MaxBillableHoursData: MaxBillableHoursType[];
  MaxBillableHoursLoading: boolean;

  MaxBillableHoursError: string;
  showNoDataofSkills: boolean;
  MaxBillableHourdeptID: number;
}
const initialState: NineBoxData = {
  MaxBillableHoursData: [],

  MaxBillableHoursLoading: false,

  MaxBillableHoursError: "",
  showNoDataofSkills: false,
  MaxBillableHourdeptID: 1,
};

//#region slice for max billable hours
const getMaxBillableHoursSl = createSlice({
  name: "maxbillablehours",

  initialState: initialState,

  reducers: {
    reset: (state: any) => {
      state.MaxBillableHoursError = "";

      state.MaxBillableHoursLoading = false;

      state.MaxBillableHoursData = [];
    },
  },

  extraReducers: {
    [getMaxBillableHours.pending]: (state: any) => {
      state.MaxBillableHoursLoading = true;
    },

    [getMaxBillableHours.fulfilled]: (state, action) => {
      state.MaxBillableHoursLoading = false;

      state.MaxBillableHoursData = action.payload.data;

      state.MaxBillableHoursError = "";
    },

    [getMaxBillableHours.rejected]: (state, action) => {
      state.MaxBillableHoursLoading = false;

      state.MaxBillableHoursError = action.payload.response.data.message;

      state.MaxBillableHoursData = [];
    },
  },
});
//#endregion

export const { reset: resetMaxBillableHoursDataAction } =
  getMaxBillableHoursSl.actions;

export const MaxBillableHoursSlice = getMaxBillableHoursSl.reducer;
