import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { decode } from "../../../common/common";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

//#region for getting 9 box data
export const getNineBoxModelData: any = createAsyncThunk(
  "/api/NineBoxModel?DepartmentId=id",
  async (params: { deptID: any; year: any; month: any }) => {
    let { deptID, year, month } = params;

    const userdata = decode(sessionStorage.getItem("token"));
    const { myDecodedToken }: any = userdata;
    const { DepartmentId } = myDecodedToken;
    if (typeof deptID === "undefined") {
      deptID = DepartmentId;
    }
    const currentDate = new Date();
    let selectedYear = year || currentDate.getFullYear();
    let selectedMonth = month || currentDate.getMonth();

    try {
      const { data } = await API.get(
        `${API_ENDPOINTS.NINE_BOX_MODEL}?DepartmentId=${deptID}&Year=${selectedYear}&Month=${selectedMonth}`,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
);

//#endregion
//#region creating slice for 9 box
const NineBoxModelSl = createSlice({
  name: "NineBoxModel",
  initialState: {
    NineBoxModelData: { data: [] },
    NineBoxModelLoading: false,
    NineBoxModelError: "",
    ShowNineBoxData: false,
    NineBoxMonth: 0,
    NineBoxyear: 0,
    NineBoxdeptId: 0,
  },

  reducers: {
    reset: (state: any) => {
      state.NineBoxModelError = "";

      state.NineBoxModelLoading = false;

      state.NineBoxModelData = [];
    },

    setMonthYearfor9Box: (state: any, action) => {
      state.NineBoxMonth = action.payload.month;
      state.NineBoxyear = action.payload.year;
    },
    setDeptIDfor9Box: (state: any, action) => {
      state.NineBoxdeptId = action.payload;
    },
  },

  extraReducers: {
    [getNineBoxModelData.pending]: (state: any) => {
      state.NineBoxModelLoading = true;
    },

    [getNineBoxModelData.fulfilled]: (state: any, action) => {
      state.NineBoxModelLoading = false;
      if (action.payload.code === 200) {
        state.ShowNineBoxData = false;
        state.NineBoxModelData = action.payload;
        state.NineBoxModelError = "";
      } else {
        state.ShowNineBoxData = true;
      }
    },

    [getNineBoxModelData.rejected]: (state, action) => {
      state.NineBoxModelLoading = false;

      state.NineBoxModelError = action.payload.response.data.message;

      state.NineBoxModelData = { data: [] };
    },
  },
});
//#endregion
export const {
  reset: resetNineBoxAction,
  setMonthYearfor9Box,
  setDeptIDfor9Box,
} = NineBoxModelSl.actions;

export const NineBoxModelSlice = NineBoxModelSl.reducer;
