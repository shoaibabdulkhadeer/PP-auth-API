import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEmployeeSl } from "../../../utils/interfaces";

//#region get Employee Data
export const getEmployeeData: any = createAsyncThunk(
  "/api/allocation-summary?DepartmentId=id",
  async (deptID: number) => {
    try {
      const { data } = await API.get(
        `${API_ENDPOINTS.DASHBOARD_ALLOCATION}?DepartmentId=${deptID}`,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
);
//#endregion

const initialState: IEmployeeSl = {
  employeeData: {
    OnBench: [],
    AllocationHoursgte8: [],
    AllocationHourslt8: [],
  },
  empLoading: false,
  empError: "",
};

//#region  Slice for handling Employee Data
const EmployeeSl = createSlice({
  name: "employeeData",

  initialState: initialState,

  reducers: {
    reset: (state: IEmployeeSl) => {
      state.empLoading = false;
      state.employeeData = {};
      state.empError = "";
    },
  },
  extraReducers: {
    [getEmployeeData.pending]: (state: IEmployeeSl) => {
      state.empLoading = true;
    },

    [getEmployeeData.fulfilled]: (state: IEmployeeSl, action) => {
      state.empLoading = false;
      state.employeeData = action.payload.data;
      state.empError = "";
    },

    [getEmployeeData.rejected]: (state: IEmployeeSl, action) => {
      state.empLoading = false;
      state.empError = action.payload.response.data.message;
      state.employeeData = {};
    },
  },
});
//#endregion

export const { reset: resetEmployeeAction } = EmployeeSl.actions;
export const EmployeeSlice = EmployeeSl.reducer;
