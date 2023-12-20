import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

//#region loging out
export const LogOut: any = createAsyncThunk("LogOut", async () => {
  try {
    const data = await API.patch(API_ENDPOINTS.AUTH_LOGOUT);
    return data;
  } catch (error: any) {
    return error.response;
  }
});
//#endregion

const LogoutSl = createSlice({
  name: "LogOut",
  initialState: {
    logOutRes: [],
    logOutLoad: false,
    logOuterror: "",
  },

  reducers: {
    reset: (state: any) => {
      state.logOuterror = "";
      state.logOutLoad = false;
      state.logOutRes = [];
    },
  },

  extraReducers: {
    [LogOut.pending]: (state: any) => {
      state.logOutLoad = true;
      state.logOuterror = "";
      state.logOutRes = [];
    },

    [LogOut.fulfilled]: (state, action) => {
      state.logOutLoad = false;
      state.logOutRes = action.payload;
      state.logOuterror = "";
    },

    [LogOut.rejected]: (state, action) => {
      state.logOutLoad = false;
      state.logOuterror = action.error;
      state.logOutRes = [];
    },
  },
});

export const { reset: resetLogOutAction } = LogoutSl.actions;
export const LogoutSlice = LogoutSl.reducer;
