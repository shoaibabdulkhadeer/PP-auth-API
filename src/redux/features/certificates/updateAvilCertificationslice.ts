import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

//#region updating availability
export const updateAvailability: any = createAsyncThunk(
  "certificates/Availability",
  async (id: string) => {
    try {
      const res = await API.patch(
        `${API_ENDPOINTS.MASTER_UPDATE_AVAILABILITY}/${id}`,
      );
      return res;
    } catch (error: any) {
      return error.response;
    }
  },
);
//#endregion

const initialState = {
  updateAvilData: [],
  updateAvilload: false,
  error: "",
};

const updateAvailCertification = createSlice({
  name: "addCertificates",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.updateAvilData = [];
      state.updateAvilload = false;
      state.error = "";
    },
  },
  extraReducers: {
    [updateAvailability.fulfilled]: (state: any, action) => {
      state.updateAvilData = action.payload;
      state.updateAvilload = false;
      state.error = action.error;
    },
    [updateAvailability.pending]: (state: any, action) => {
      state.updateAvilData = [];
      state.updateAvilload = true;
      state.error = action.error;
    },
    [updateAvailability.rejected]: (state: any, action) => {
      state.updateAvilData = action.payload;
      state.updateAvilload = false;
      state.error = action.error;
    },
  },
});

export const availCertificateSlice = updateAvailCertification.reducer;
