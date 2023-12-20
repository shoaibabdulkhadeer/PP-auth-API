import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEmpSkillsSl } from "../../../utils/interfaces";

//#region DEFINE INITIAL STATE FOR EMPLOYEE SKILLS DATA
const initialState: IEmpSkillsSl = {
  employeeSkillsData: [],
  employeeSkillsDataLoading: false,
  error: "",
};
//#endregion

//#region DEFINE ASYNCHRONOUS THUNK ACTION TO FETCH EMPLOYEE SKILLS
export const fetchEmployeeSkills: any = createAsyncThunk(
  "employeeSkillsInfo/fetch",
  async () => {
    try {
      const response = await API.get(`${API_ENDPOINTS.SKILLS_BASIC_INFO_GET}`);
      return response.data.data;
    } catch (error: any) {
      const errorObject = {
        code: error?.response ? error.response.status : 500,
        message: error.response
          ? "Something went wrong please try again later"
          : "Internal server error!",
      };
      return errorObject;
    }
  },
);

//#endregion

//#region CREATE EMPLOYEE SKILLS SLICE
const EmpSkillsSl = createSlice({
  name: "employeeSkillsInfo",
  initialState,
  reducers: {
    reset: (state: IEmpSkillsSl) => {
      state.employeeSkillsData = [];

      state.employeeSkillsDataLoading = false;

      state.error = "";
    },
  },
  extraReducers: {
    [fetchEmployeeSkills.pending]: (state: IEmpSkillsSl) => {
      state.employeeSkillsDataLoading = true;
    },
    [fetchEmployeeSkills.fulfilled]: (state: IEmpSkillsSl, action) => {
      state.employeeSkillsDataLoading = false;
      if (action.payload.code !== 500) {
        state.employeeSkillsData = action?.payload;
      } else {
        state.employeeSkillsData = [];
      }
    },
    [fetchEmployeeSkills.rejected]: (state: IEmpSkillsSl, action) => {
      state.employeeSkillsDataLoading = false;
      state.error = action.error.message;
    },
  },
});
//#endregion

export const { reset: resetEmpSkillsAction } = EmpSkillsSl.actions;
export const EmpSkillsSlice = EmpSkillsSl.reducer;
