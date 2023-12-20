import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IGetAllSkillsSl } from "../../../utils/interfaces";

export const getAllSkills: any = createAsyncThunk("getAllSkills", async () => {
  try {
    const { data } = await API.get(API_ENDPOINTS.SKILL_GET_ALL);
    return data;
  } catch (error) {
    return error;
  }
});

const initialState: IGetAllSkillsSl = {
  skillData: [],
  skillLoad: false,
  skillMsg: "",
};

const SkillSl = createSlice({
  name: "getAllSkills",
  initialState: initialState,
  reducers: {
    reset: (state: IGetAllSkillsSl) => {
      state.skillMsg = "";
      state.skillLoad = false;
      state.skillData = [];
    },
  },

  extraReducers: {
    [getAllSkills.pending]: (state: IGetAllSkillsSl) => {
      state.skillLoad = true;
    },

    [getAllSkills.fulfilled]: (state: IGetAllSkillsSl, action) => {
      if (action.payload.data) {
        state.skillData = action.payload.data;
      }
      if (action.payload.response?.data.code) {
        state.skillMsg = action.payload.response.data.message;
      }
      state.skillLoad = false;
    },

    [getAllSkills.rejected]: (state: IGetAllSkillsSl, action) => {
      state.skillLoad = false;
      state.skillMsg = action.payload.response.data.message;
    },
  },
});

export const { reset: resetCertificateAction } = SkillSl.actions;
export const SkillSlice = SkillSl.reducer;
