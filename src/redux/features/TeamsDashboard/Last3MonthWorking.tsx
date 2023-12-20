import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

//#region Async Thunk
export const getLastThreemonthWorkingHours: any = createAsyncThunk(
  "/api/LastThreemonthWorkingHours?DepartmentId=id",
  async (deptID: number, { getState }) => {
    try {
      const { data } = await API.get(
        `${API_ENDPOINTS.LAST_THREE_MONTH_WORKING_HOURS}?DepartmentId=${deptID}`,
      );

      return data;
    } catch (error) {
      return error;
    }
  },
);
//#endregion

interface ILastThreeMonthWorkingHoursData {
  totalBillableHours: number;
  totalNonBillableHours: number;
}

const data: ILastThreeMonthWorkingHoursData = {
  totalBillableHours: 0,
  totalNonBillableHours: 0,
};

//#region Redux Slice

const LastThreemonthWorkingHoursSl = createSlice({
  name: "LastThreeMonthWorkingHours",
  initialState: {
    LastThreeMonthWorkingHoursData: data,
    LastThreeMonthWorkingHoursLoading: false,
    LastThreeMonthWorkingHoursError: "",
  },
  reducers: {
    reset: (state: any) => {
      state.LastThreeMonthWorkingHoursError = "";
      state.LastThreeMonthWorkingHoursLoading = false;
      state.LastThreeMonthWorkingHoursData = [];
    },
  },
  extraReducers: {
    [getLastThreemonthWorkingHours.pending]: (state: any) => {
      state.LastThreeMonthWorkingHoursLoading = true;
    },
    [getLastThreemonthWorkingHours.fulfilled]: (state, action) => {
      state.LastThreeMonthWorkingHoursLoading = false;
      state.LastThreeMonthWorkingHoursData = action.payload.data;
      state.LastThreeMonthWorkingHoursError = "";
    },
    [getLastThreemonthWorkingHours.rejected]: (state, action) => {
      state.LastThreeMonthWorkingHoursLoading = false;
      state.LastThreeMonthWorkingHoursError =
        action.payload.response.data.message;
      state.LastThreeMonthWorkingHoursData = action.payload;
    },
  },
});
//#endregion

export const { reset: resetLogOutAction } =
  LastThreemonthWorkingHoursSl.actions;

export const LastThreemonthWorkingHoursSlice =
  LastThreemonthWorkingHoursSl.reducer;
