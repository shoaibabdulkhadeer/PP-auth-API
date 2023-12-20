import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

export const disableSkill: any = createAsyncThunk(
  "skills/disable",
  async (data: any) => {
    try {
      const res = await API.patch(
        `${API_ENDPOINTS.MASTER_DISABLE_SKILL}/${data.SkillGuId}`,
      );
      return res;
    } catch (error: any) {
      const errorObject = {
        code: error.response ? error.response.status : 500,
        message: error.response
          ? error.response.data.message
          : "Internal Server Error",
      };
      return errorObject;
    }
  },
);

const disableSkillSl = createSlice({
  name: "disableSkill",
  initialState: {
    disableData: [],
    skillsLoad: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(disableSkill.pending, (state: any) => {
        state.skillsLoad = true;
      })
      .addCase(disableSkill.fulfilled, (state: any, action) => {
        state.skillsLoad = false;
        state.disableData = action.payload;
      })
      .addCase(disableSkill.rejected, (state: any) => {
        state.skillsLoad = false;
      });
  },
});

export const disableSkillSlice = disableSkillSl.reducer;
