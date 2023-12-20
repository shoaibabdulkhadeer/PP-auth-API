import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
//#region for getting woerking hours
export const Bill_Nonbill_hrs: any = createAsyncThunk(
  "api/WorkingHours?DepartmentId=id",

  async (params: { deptID: any; year: any; month: any }) => {
    let { deptID, year, month } = params;

    const currentDate = new Date();
    let selectedYear = year || currentDate.getFullYear();
    let selectedMonth = month || currentDate.getMonth();

    try {
      const response: any = await API.get(
        `${API_ENDPOINTS.BILLABLE_NONBILLABLE_HOURS}?DepartmentId=${deptID}&Year=${selectedYear}&Month=${selectedMonth}`,
      );

      return response;
    } catch (error) {
      return error;
    }
  },
);
//#endregion

//#region slice for working hours
const Bill_Nonbill_hrsSl = createSlice({
  name: "Bill_Nonbill_hrs",

  initialState: {
    Bill_Nonbill_Data: { data: [] },

    Bill_Nonbill_hrsLoading: false,

    Bill_Nonbill_hrsError: "",
    showNoDataforWorking: false,
    month: 0,
    year: 0,
    deptId: 0,
    sendingdata: [],
  },

  reducers: {
    reset: (state: any) => {
      state.ratingError = "";

      state.ratingLoading = false;

      state.Bill_Nonbill_hrs = [];
    },

    setMonthYear: (state: any, action) => {
      state.month = action.payload.month;
      state.year = action.payload.year;
    },
    setDeptIDforbillable: (state: any, action) => {
      state.deptId = action.payload;
    },

    setSendingData: (state: any, action: any) => {
      state.sendingdata = action.payload;
    },
  },

  extraReducers: {
    [Bill_Nonbill_hrs.pending]: (state: any) => {
      state.Bill_Nonbill_hrsLoading = true;
    },

    [Bill_Nonbill_hrs.fulfilled]: (state: any, action: any) => {
      state.Bill_Nonbill_hrsLoading = false;
      if (action.payload?.data?.code === 200) {
        state.showNoDataforWorking = false;
        state.Bill_Nonbill_Data = action.payload.data;
        state.Bill_Nonbill_hrsError = "";

        state.sendingdata = action.payload.data.data;
      } else {
        state.showNoDataforWorking = true;
      }
      state.Bill_Nonbill_Data = action.payload.data;
      state.Bill_Nonbill_hrsError = "";
    },

    [Bill_Nonbill_hrs.rejected]: (state, action) => {
      state.Bill_Nonbill_hrsLoading = false;

      state.Bill_Nonbill_hrsError = action.payload.response.data.message;

      state.Bill_Nonbill_Data = { data: [] };
    },
  },
});
//#endregion
export const {
  reset: resetBill_Nonbill_hrsAction,
  setMonthYear,
  setDeptIDforbillable,
} = Bill_Nonbill_hrsSl.actions;

export const Bill_Nonbill_hrsSlice = Bill_Nonbill_hrsSl.reducer;
