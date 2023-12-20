import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IProjectDetailsSl } from "../../../utils/interfaces";

//#region DEFINE INITIAL STATE FOR PROJECT DETAILS
const initialState: IProjectDetailsSl = {
  projectData: [],
  activeProjects: [],
  pastProjects: [],
  upcomingProjects: [],
  projectDataLoading: false,
  error: "",
};
//#endregion

//#region  DEFINE ASYNCHRONOUS THUNK ACTION TO FETCH PROJECTS INFO
export const fetchProjectsBasicInfo: any = createAsyncThunk(
  "projectBasicInfo/fetch",
  async () => {
    try {
      const response = await API.get(`${API_ENDPOINTS.PROJECT_BASIC_INFO_GET}`);
      return response.data.data;
    } catch (error: any) {
      const errorObject = {
        code: error?.response ? error.response.status : 500,
        message: error.response
          ? "Something went wrong please try again later"
          : "Internal server error!",
      };
      return errorObject;
    }
  },
);
//#endregion

//#region  CREATE PROJECT DETAILS SLICE
const ProjectDetailsSl = createSlice({
  name: "projectDetails",
  initialState,
  reducers: {
    reset: (state: IProjectDetailsSl) => {
      state.projectData = [];
      state.activeProjects = [];
      state.pastProjects = [];
      state.upcomingProjects = [];
      state.projectDataLoading = false;
      state.error = "";
    },
  },
  extraReducers: {
    [fetchProjectsBasicInfo.pending]: (state: IProjectDetailsSl) => {
      state.projectDataLoading = true;
    },
    [fetchProjectsBasicInfo.fulfilled]: (state: IProjectDetailsSl, action) => {
      state.projectDataLoading = false;
      state.projectData = action?.payload;
      const currentDate = new Date();
      if (action.payload.code !== 500) {
        state.activeProjects = action.payload?.filter(
          (project: any) =>
            new Date(project?.ProjectGuIdInfo?.EndDate) >= currentDate &&
            new Date(project?.ProjectGuIdInfo?.StartDate) <= currentDate,
        );
        state.pastProjects = action?.payload?.filter(
          (project: any) =>
            new Date(project?.ProjectGuIdInfo?.EndDate) < currentDate &&
            new Date(project?.ProjectGuIdInfo?.StartDate) < currentDate,
        );
        state.upcomingProjects = action?.payload?.filter(
          (project: any) =>
            new Date(project?.ProjectGuIdInfo?.StartDate) > currentDate &&
            new Date(project?.ProjectGuIdInfo?.EndDate) > currentDate,
        );
      } else {
        state.activeProjects = [];
        state.projectData = [];
        state.pastProjects = [];
        state.upcomingProjects = [];
      }
    },
    [fetchProjectsBasicInfo.rejected]: (state: IProjectDetailsSl, action) => {
      state.projectDataLoading = false;
      state.error = action.error.message;
    },
  },
});
//#endregion

export const { reset: projectDetailsAction } = ProjectDetailsSl.actions;
export const ProjectDetailsSlice = ProjectDetailsSl.reducer;
