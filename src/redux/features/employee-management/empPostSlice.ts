import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEmployeePostSl } from "../../../utils/interfaces";
import { IEmployee } from "../../../utils/validation";

export const postEmployeeData: any = createAsyncThunk(
  "empDetailsPost",
  async (empDetails: IEmployee) => {
    try {
      const EmpDeatials = {
        FullName: empDetails.FullName,
        Username: empDetails.Username,
        CommunicationEmailAddress: empDetails.CommunicationEmailAddress,
        EmployeeID: empDetails.EmployeeID,
        JoiningDate: empDetails.JoiningDate,
        TotalYearsOfExperience: empDetails.TotalYearsOfExperience,
        DesignationId: empDetails.DesignationId,
        DepartmentId: empDetails.DepartmentId,
        HourlyCost: empDetails.HourlyCost,
        RoleID: empDetails.RoleID,
        ReportingManagerEmployeeGuID: empDetails.ReportingManagerEmployeeGuID,
      };

      const { data } = await API.post(
        API_ENDPOINTS.EMPLOYEE_MANAGE_POST,
        EmpDeatials,
      );

      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState: IEmployeePostSl = {
  empRes: [],
  empLoad: false,
  emperror: "",
  empPostCode: 0,
  empID: "",
};

const EmpPostSl = createSlice({
  name: "getRoles",
  initialState: initialState,
  reducers: {
    reset: (state: IEmployeePostSl) => {
      state.emperror = "";
      state.empLoad = false;
      state.empRes = [];
      state.empPostCode = 0;
    },
  },

  extraReducers: {
    [postEmployeeData.pending]: (state: IEmployeePostSl) => {
      state.empLoad = true;
    },

    [postEmployeeData.fulfilled]: (state: IEmployeePostSl, action) => {
      state.empRes = action.payload;
      if (action.payload.code) {
        state.empPostCode = action.payload.code;
        state.emperror = action.payload.message;
      }
      if (action.payload?.response?.data.code) {
        state.empPostCode = action.payload.response.data.code;
        state.emperror = action.payload.response.data.message;
      }
      state.empLoad = false;
    },

    [postEmployeeData.rejected]: (state: IEmployeePostSl, action) => {
      state.empLoad = false;
      state.emperror = action.payload.response.data.message;
      state.empRes = [];
    },
  },
});

export const { reset: resetEmpPostAction } = EmpPostSl.actions;
export const EmpDetailsSlice = EmpPostSl.reducer;
