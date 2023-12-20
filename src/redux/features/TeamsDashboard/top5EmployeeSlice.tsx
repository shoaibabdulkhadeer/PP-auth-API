import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { decode } from "../../../common/common";
//#region for getting average rating data of all employees
export const getratingData: any = createAsyncThunk(
  "/api/rating?DepartmentId=id",
  async (deptID: number, { getState }) => {
    const userdata = decode(sessionStorage.getItem("token"));
    const { myDecodedToken }: any = userdata;
    var { DepartmentId } = myDecodedToken;

    if (typeof deptID === "undefined") {
      deptID = DepartmentId;
    }
    try {
      const { data } = await API.get(
        `${API_ENDPOINTS.AVG_RATING}?DepartmentId=${deptID}`,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
);
//#endregion

//#region slice for average rating
const RatingSl = createSlice({
  name: "rating",

  initialState: {
    ratingData: [],

    ratingLoading: false,

    ratingError: "",
    showNoDataofSkills: false,
  },

  reducers: {
    reset: (state: any) => {
      state.ratingError = "";

      state.ratingLoading = false;

      state.ratingData = [];
    },
  },

  extraReducers: {
    [getratingData.pending]: (state: any) => {
      state.ratingLoading = true;
    },

    [getratingData.fulfilled]: (state, action) => {
      state.ratingLoading = false;

      state.showNoDataofSkills = false;
      state.ratingData = action.payload.data;

      state.ratingError = "";
    },

    [getratingData.rejected]: (state, action) => {
      state.ratingLoading = false;

      state.ratingError = action.payload.response.data.message;

      state.ratingData = [];
    },
  },
});
//#endregion
export const { reset: resetLogOutAction } = RatingSl.actions;

export const RatingSlice = RatingSl.reducer;
