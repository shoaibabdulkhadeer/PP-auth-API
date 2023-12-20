import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IDesignation } from "../../../utils/interfaces";

export const GetDesignationsData: any = createAsyncThunk(
  "getDesignations",
  async () => {
    try {
      const { data } = await API.get(API_ENDPOINTS.DESIGNATION_GET);

      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState: IDesignation = {
  disgnationRes: [],
  disgnationLoad: false,
  disgnationerror: "",
  disgOptions: [],
};

const DesignationSl = createSlice({
  name: "getDesignations",
  initialState: initialState,
  reducers: {
    reset: (state: IDesignation) => {
      state.disgnationerror = "";
      state.disgnationLoad = false;
      state.disgnationRes = [];
    },
  },

  extraReducers: {
    [GetDesignationsData.pending]: (state: IDesignation) => {
      state.disgnationLoad = true;
    },

    [GetDesignationsData.fulfilled]: (state: IDesignation, action) => {
      state.disgnationLoad = false;
      state.disgnationRes = action.payload.data;
      state.disgnationerror = "";

      // creating Designation Select Dropdown option
      state.disgOptions = [];
      for (let i = 0; i < state.disgnationRes?.length; i++) {
        const disgnation: any = state.disgnationRes[i];
        const value = disgnation.DesignationName;
        const label = disgnation.DesignationName;
        state.disgOptions.push({ value, label });
      }
    },

    [GetDesignationsData.rejected]: (state: IDesignation, action) => {
      state.disgnationLoad = false;
      state.disgnationerror = action.payload.response.data.message;
      state.disgnationRes = [];
    },
  },
});

export const { reset: resetDesignationAction } = DesignationSl.actions;
export const DesignationSlice = DesignationSl.reducer;
