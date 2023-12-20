import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEmpProfileSl } from "../../../utils/interfaces";

//#region DEFINE INITIAL STATE FOR EMPLOYEE GET BASIC INFO
const initialState: IEmpProfileSl = {
  employeeData: [],
  employeeDataLoading: false,
  error: "",
};
//#endregion

//#region DEFINE ASYNCHRONOUS THUNK ACTION TO FETCH EMPLOYEE BASIC INFO
export const fetchEmployeeBasicInfo: any = createAsyncThunk(
  "employeeBasicInfo/fetch",
  async () => {
    try {
      // if (!employeeGuid) return null;
      const response = await API.get(
        `${API_ENDPOINTS.EMPLOYEE_BASIC_INFO_GET}`,
      );

      let date = new Date(Number(response.data.data.JoiningDate)).toString();

      const inputDate = new Date(date);
      const options: any = { year: "numeric", month: "short", day: "2-digit" };
      const formattedDate = inputDate.toLocaleDateString("en-IN", options);

      response.data.data.JoiningDate = formattedDate;
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

//#region CREATE EMPLOYEE BASIC INFO SLICE
const EmpProfileSl = createSlice({
  name: "employeeBasicInfo",
  initialState,
  reducers: {
    reset: (state: IEmpProfileSl) => {
      state.employeeData = [];

      state.employeeDataLoading = false;

      state.error = "";
    },
  },
  extraReducers: {
    [fetchEmployeeBasicInfo.pending]: (state: IEmpProfileSl) => {
      state.employeeDataLoading = true;
    },
    [fetchEmployeeBasicInfo.fulfilled]: (state: IEmpProfileSl, action) => {
      state.employeeDataLoading = false;
      state.employeeData = action.payload;
    },
    [fetchEmployeeBasicInfo.rejected]: (state: IEmpProfileSl, action) => {
      state.employeeDataLoading = false;
      state.error = action.error.message;
    },
  },
});
//#endregion

export const { reset: resetEmpProfileAction } = EmpProfileSl.actions;
export const EmpProfileSlice = EmpProfileSl.reducer;
