import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import API from "../../../config/axios.config";
import { IEmpNameId } from "../../../utils/interfaces";

export const fetchingEmpName: any = createAsyncThunk("empName", async () => {
  try {
    const { data } = await API.get(API_ENDPOINTS.GET_EMP_NAME);

    return data;
  } catch (error: any) {
    return error.response.data;
  }
});

const initial9boxdata: IEmpNameId = {
  EmpNameId: [],
  EmpNameIdloading: false,
  EmpNameIderror: "",
};

//#region fetching the 9Box
export const EmpNameSl = createSlice({
  name: "EmpName",
  initialState: initial9boxdata,
  reducers: {
    reset: (state: IEmpNameId) => {
      state.EmpNameIdloading = true;
      state.EmpNameId = [];
      state.EmpNameIderror = "";
    },
  },
  extraReducers: {
    [fetchingEmpName.pending]: (state: IEmpNameId) => {
      state.EmpNameIdloading = true;
      state.EmpNameId = [];
      state.EmpNameIderror = "";
    },
    [fetchingEmpName.fulfilled]: (state: IEmpNameId, action: any) => {
      state.EmpNameIdloading = false;
      state.EmpNameId = action.payload.data;
    },
    [fetchingEmpName.rejected]: (state: IEmpNameId, action: any) => {
      state.EmpNameIdloading = false;
      state.EmpNameId = [];
      state.EmpNameIderror = action.error.message;
    },
  },
});
//#endregion

export const { reset: resetNineBoxAction } = EmpNameSl.actions;
export const EmpNameSlice = EmpNameSl.reducer;
