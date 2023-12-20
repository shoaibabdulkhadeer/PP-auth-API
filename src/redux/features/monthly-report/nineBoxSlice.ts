import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IGet9Box } from "../../../utils/interfaces";

export const fetching9box: any = createAsyncThunk("9box", async () => {
  try {
    const { data } = await API.get(API_ENDPOINTS.GET_9BOXMODLE);
    return data;
  } catch (error) {
    throw error;
  }
});

//redux data
const initial9boxdata: IGet9Box = {
  nineBox: [],
  nineBoxloading: false,
  nineBoxerror: "",
};

//#region fetching the 9Box
export const NineBoxSl = createSlice({
  name: "nine",
  initialState: initial9boxdata,
  reducers: {
    reset: (state: IGet9Box) => {
      state.nineBoxloading = true;
      state.nineBox = [];
      state.nineBoxerror = "";
    },
  },
  extraReducers: {
    [fetching9box.pending]: (state: IGet9Box) => {
      state.nineBoxloading = true;
      state.nineBox = [];
      state.nineBoxerror = "";
    },
    [fetching9box.fulfilled]: (state: IGet9Box, action: any) => {
      state.nineBoxloading = false;
      state.nineBox = action.payload.data;
    },
    [fetching9box.rejected]: (state: IGet9Box, action: any) => {
      state.nineBoxloading = false;
      state.nineBox = [];
      state.nineBoxerror = action.error.message;
    },
  },
});
//#endregion
export const { reset: resetNineBoxAction } = NineBoxSl.actions;
export const NineBoxSlice = NineBoxSl.reducer;
