import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IDepartments } from "../../../utils/interfaces";

const intialState: IDepartments = {
  dptData: [],
  dptName: "",
  dptLoading: false,
  dptError: "",
  departments: [],
  departmentsId: [],
};
//#region get Department Data
export const getDepartmentData: any = createAsyncThunk(
  "/api/masters/departments",
  async () => {
    try {
      const { data } = await API.get(API_ENDPOINTS.DEPARTMENTS_GET);
      return data;
    } catch (error) {
      return error;
    }
  },
);
//#endregion

//#region Slice for handling Department Data
const DepartmentSl = createSlice({
  name: "departmentData",
  initialState: intialState,
  reducers: {
    reset: (state: IDepartments) => {
      state.dptLoading = false;
      state.dptData = [];
      state.dptName = "";
      state.dptError = "";
      state.departmentsId = [];
    },

    setDepartmentName: (state: IDepartments, action) => {
      state.dptName = action.payload;
    },
    setDepartmentId: (state: IDepartments, action) => {
      const DepartmentId = action.payload;
      const department = state.departmentsId.find(
        (dept) => dept.value === DepartmentId,
      );

      if (department) {
        state.dptName = department.label;
      }
    },
  },
  extraReducers: {
    [getDepartmentData.pending]: (state: IDepartments) => {
      state.dptLoading = true;
    },

    [getDepartmentData.fulfilled]: (state, action) => {
      state.dptLoading = false;
      state.dptData = action.payload.data;
      state.dptError = "";

      state.departments = [];
      state.departmentsId = [];
      for (let i = 0; i < state.dptData?.length; i++) {
        const dept: any = state.dptData[i];
        const value = dept.DepartmentName;
        const label = dept.DepartmentName;
        state.departments.push({ value, label });
      }
      for (let i = 0; i < action.payload?.data?.length; i++) {
        const dept: any = action.payload.data[i];
        const value = dept.DepartmentId;
        const label = dept.DepartmentName;
        state.departmentsId.push({ value, label });
      }
    },
    [getDepartmentData.rejected]: (state, action) => {
      state.dptLoading = false;
      state.dptError = action.payload.response.data.message;
      state.dptData = [];
    },
  },
});

//#endregion

export const {
  reset: resetDepartmentAction,
  setDepartmentName,
  setDepartmentId,
} = DepartmentSl.actions;
export const DepartmentSlice = DepartmentSl.reducer;
