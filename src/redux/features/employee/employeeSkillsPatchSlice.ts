import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEmpSkillsPatchSl } from "../../../utils/interfaces";

//#region DEFINE INITIAL STATE FOR EMPLOYEE SKILLS PATCH
const initialState: IEmpSkillsPatchSl = {
  patchedEmpSelfRating: [],
  patchedEmpSelfRatingLoading: false,
  message: "",
  code: 0,
};
//#endregion

//#region DEFINE ASYNCHRONOUS THUNK ACTION TO UPDATE EMPLOYEE SKILLS SELF RATING
export const updateEmployeeSelfRating: any = createAsyncThunk(
  "patchEmpSelfRating/fetch",
  async (payload, thunkAPI) => {
    try {
      const response = await API.patch(
        `${API_ENDPOINTS.SKILLS_UPDATE_PATCH}`,
        payload,
      );
      return response;
    } catch (error: any) {
      const errorObject = {
        code: error.response ? error.response.status : 500,
        message: error.response
          ? "Something went wrong please try again later"
          : "Internal Server Error",
      };
      return errorObject;
    }
  },
);
//#endregion

//#region DEFINE UPDATE EMPLOYEE SKILLS SLICE
const UpdateEmpSkillsSl = createSlice({
  name: "employeeSkillsInfo",
  initialState,
  reducers: {
    reset: (state: IEmpSkillsPatchSl) => {
      state.patchedEmpSelfRating = [];

      state.patchedEmpSelfRatingLoading = false;

      state.message = "";
    },
  },
  extraReducers: {
    [updateEmployeeSelfRating.pending]: (state: IEmpSkillsPatchSl) => {
      state.patchedEmpSelfRatingLoading = true;
    },
    [updateEmployeeSelfRating.fulfilled]: (
      state: IEmpSkillsPatchSl,
      action,
    ) => {
      state.patchedEmpSelfRatingLoading = false;
      if (action.payload.code !== 500) {
        state.patchedEmpSelfRating = action.payload;
      } else {
        state.patchedEmpSelfRating = [];
      }
    },
    [updateEmployeeSelfRating.rejected]: (state: IEmpSkillsPatchSl, action) => {
      state.patchedEmpSelfRatingLoading = false;
      state.message = action.error.message;
    },
  },
});
//#endregion

export const { reset: resetEmpSelfRatingAction } = UpdateEmpSkillsSl.actions;
export const UpdateEmpSkillsSlice = UpdateEmpSkillsSl.reducer;
