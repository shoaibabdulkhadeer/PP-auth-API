import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

export const addProjects = createAsyncThunk(
  "projects/add",
  async (data: any) => {
    try {
      const res = await API.post(API_ENDPOINTS.MASTER_ADD_PROJECT, data, {
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
  },
);

const addProjectsSl = createSlice({
  name: "addProjects",
  initialState: {
    projectsLoad: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addProjects.pending, (state: any) => {
        state.projectsLoad = true;
      })
      .addCase(addProjects.fulfilled, (state: any, action) => {
        state.projectsLoad = false;
      })
      .addCase(addProjects.rejected, (state: any) => {
        state.projectsLoad = false;
      });
  },
});

export const addProjectsSlice = addProjectsSl.reducer;
