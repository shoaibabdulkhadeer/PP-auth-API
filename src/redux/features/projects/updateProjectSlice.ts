import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

export const updateProject: any = createAsyncThunk(
  "projects/edit",
  async (formData: any) => {
    try {
      const res = await API.put(
        `${API_ENDPOINTS.MASTER_UPDATE_PROJECT}/${formData.ProjectGuId}`,
        formData,
      );
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
  },
);

const updateProjectsSl = createSlice({
  name: "updateProjects",
  initialState: {
    projectsLoad: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateProject.pending, (state: any) => {
        state.projectsLoad = true;
      })
      .addCase(updateProject.fulfilled, (state: any, action) => {
        state.projectsLoad = false;
      })
      .addCase(updateProject.rejected, (state: any) => {
        state.projectsLoad = false;
      });
  },
});

export const updateProjectsSlice = updateProjectsSl.reducer;
