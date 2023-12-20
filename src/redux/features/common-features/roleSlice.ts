import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IRolesSl } from "../../../utils/interfaces";

export const GetRolesData: any = createAsyncThunk("getRoles", async () => {
  try {
    const { data } = await API.get(API_ENDPOINTS.ROLES_GET);

    return data;
  } catch (error) {
    return error;
  }
});

const initialState: IRolesSl = {
  rolesRes: [],
  rolesLoad: false,
  roleserror: "",
  roleOptions: [],
};

const RolesSl = createSlice({
  name: "getRoles",
  initialState: initialState,
  reducers: {
    reset: (state: any) => {
      state.roleserror = "";
      state.rolesLoad = false;
      state.rolesRes = [];
    },
  },

  extraReducers: {
    [GetRolesData.pending]: (state: IRolesSl) => {
      state.rolesLoad = true;
    },

    [GetRolesData.fulfilled]: (state: IRolesSl, action) => {
      state.rolesLoad = false;
      state.rolesRes = action.payload.data;
      state.roleserror = "";
      state.roleOptions = [];
      for (let i = 0; i < state.rolesRes?.length; i++) {
        const roleoption: any = state.rolesRes[i];
        const value = roleoption.RoleName;
        const label = roleoption.RoleName;
        state.roleOptions.push({ value, label });
      }
    },

    [GetRolesData.rejected]: (state: IRolesSl, action) => {
      state.rolesLoad = false;
      state.roleserror = action.payload.response.data.message;
      state.rolesRes = [];
    },
  },
});

export const { reset: resetRolesAction } = RolesSl.actions;
export const RolesSlice = RolesSl.reducer;
