import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

export const updateSkill: any = createAsyncThunk(
  "skill/edit",
  async (formData: any) => {
    try {
      const res = await API.put(
        `${API_ENDPOINTS.MASTER_UPDATE_SKILL}/${formData.SkillGuId}`,
        formData,
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

const updateSkillSl = createSlice({
  name: "updateSkill",
  initialState: {
    skillsLoad: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateSkill.pending, (state: any) => {
        state.skillsLoad = true;
      })
      .addCase(updateSkill.fulfilled, (state: any, action) => {
        state.skillsLoad = false;
      })
      .addCase(updateSkill.rejected, (state: any) => {
        state.skillsLoad = false;
      });
  },
});

export const updateSkillSlice = updateSkillSl.reducer;
