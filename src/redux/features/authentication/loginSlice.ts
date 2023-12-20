import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { logCred } from "../../../utils/interfaces";

//#region loging into Session
const loginApi: any = createAsyncThunk("employees", async (data: any) => {
  try {
    const info = await API.post(API_ENDPOINTS.AUTH_LOGIN, data);
    return info;
  } catch (error: any) {
    return error.response;
  }
});
//#endregion

const initialState = {
  loggedIn: [],
  loading: false,
  error: "",
};
const login = createSlice({
  name: "LogIn",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.loggedIn = false;
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: {
    [loginApi.fulfilled]: (state: any, action) => {
      state.data = action.payload;
      state.loggedIn = action.payload;
      state.loading = false;
      state.error = "";
    },
    [loginApi.pending]: (state: any) => {
      state.data = [];
      state.loading = true;
      state.error = "";
    },
    [loginApi.rejected]: (state: any, action) => {
      state.loggedIn = [];
      state.loading = false;
      state.error = action?.error;
    },
  },
});

export { loginApi };
export const { reset } = login.actions;
export const LoginSlice = login.reducer;
