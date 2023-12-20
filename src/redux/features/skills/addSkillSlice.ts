import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

export const addSkill = createAsyncThunk("skill/add", async (data: any) => {
  try {
    const res = await API.post(API_ENDPOINTS.MASTER_ADD_SKILLS, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    const errorObject = {
      code: error.response ? error.response.status : 500,
      message: error.response
        ? error.response.data.message
        : "Internal Server Error",
    };
    return errorObject;
  }
});

const addSkillSl = createSlice({
  name: "addSkill",
  initialState: {
    skillsLoad: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addSkill.pending, (state: any) => {
        state.skillsLoad = true;
      })
      .addCase(addSkill.fulfilled, (state: any, action) => {
        state.skillsLoad = false;
      })
      .addCase(addSkill.rejected, (state: any) => {
        state.skillsLoad = false;
      });
  },
});

export const addSkillSlice = addSkillSl.reducer;
