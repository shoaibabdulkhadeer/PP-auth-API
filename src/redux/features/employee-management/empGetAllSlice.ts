import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IGetALLEmpSl } from "../../../utils/interfaces";
import { intailEMployeeData } from "../../../utils/validation";

export const getAllEmployeesData: any = createAsyncThunk(
  "getAllEmployeesData",
  async (filter?: any) => {
    try {
      const { page, name } = filter;
      const { data } = await API.get(
        `${API_ENDPOINTS.EMPLOYEE_MANAGE_GETALL}?page=${page}&fullName=${name}`,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState: IGetALLEmpSl = {
  empGetRes: [],
  empGetLoad: false,
  empGeterror: "",
  basicIntial: intailEMployeeData,
  basicLoad: false,
  basicResetLoad: false,
  empID: "",
  totalCount: 0,
  empGetCode: 0,
  pageId: 1,
};

const EmpGetAllSl = createSlice({
  name: "getAllEmployeesData",
  initialState: initialState,
  reducers: {
    reset: (state: IGetALLEmpSl) => {
      state.empGeterror = "";
      state.empGetLoad = false;
      state.empGetRes = [];
      state.totalCount = 0;
    },
    resetBasicEmpDatails: (state: IGetALLEmpSl) => {
      state.basicIntial = intailEMployeeData;
      state.basicResetLoad = !state.basicResetLoad;
      state.empID = "";
    },
    editEmpDetails: (state: IGetALLEmpSl, action) => {
      state.basicIntial = action.payload;
      state.empID = action.payload.EmployeeGuID;
    },
    setEmpGuidID: (state: IGetALLEmpSl, action) => {
      state.empID = action.payload;
    },
    setPageID: (state: IGetALLEmpSl, action) => {
      state.pageId = action.payload;
    },
  },

  extraReducers: {
    [getAllEmployeesData.pending]: (state: IGetALLEmpSl) => {
      state.empGetLoad = true;
    },

    [getAllEmployeesData.fulfilled]: (state: IGetALLEmpSl, action) => {
      state.empGetLoad = false;
      state.empGetRes = action.payload.data?.users;
      state.empGetCode = action.payload.code;
      state.totalCount = action.payload?.data?.totalUsersCount
        ? action.payload?.data?.totalUsersCount
        : 0;
      state.empGeterror = "";
    },

    [getAllEmployeesData.rejected]: (state: IGetALLEmpSl, action) => {
      state.empGetLoad = false;
      state.empGeterror = action.payload.response.data.message;
      state.empGetCode = action.payload.response.data.code;
      state.empGetRes = [];
    },
  },
});

export const {
  reset: resetEmpGetAllAction,
  editEmpDetails,
  resetBasicEmpDatails,
  setEmpGuidID,
  setPageID,
} = EmpGetAllSl.actions;
export const EmpGetAllSlice = EmpGetAllSl.reducer;
