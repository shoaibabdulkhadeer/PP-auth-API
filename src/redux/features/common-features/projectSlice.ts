import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IProjectSl } from "../../../utils/interfaces";
import { ProjectTypes } from "../../../shared/enums";

export const getProjects: any = createAsyncThunk(
  "getProjects",
  async ({ EmployeeGuID, projectStatus, page }: any) => {
    try {
      const { data } = await API.post(
        `${API_ENDPOINTS.PROJECT_GET}?Page ID=${page ? page : 1}`,
        {
          EmployeeGuID,
          projectStatus,
        },
      );
      return { data, projectStatus };
    } catch (error) {
      return error;
    }
  },
);

const initialState: IProjectSl = {
  activeCount: 0,
  upcomingCount: 0,
  pastCount: 0,
  activeProjects: [],
  upcomingProjects: [],
  pastProjects: [],
  isProjectLoaded: false,
  projectLoad: false,
  projecterror: "",
};

const ProjectSl = createSlice({
  name: "getProjects",
  initialState: initialState,
  reducers: {
    reset: (state: IProjectSl) => {
      state.projecterror = "";
      state.projectLoad = false;
      state.activeCount = 0;
      state.upcomingCount = 0;
      state.pastCount = 0;
      state.activeProjects = [];
      state.upcomingProjects = [];
      state.pastProjects = [];
      state.isProjectLoaded = false;
    },
  },

  extraReducers: {
    [getProjects.pending]: (state: IProjectSl) => {
      state.projectLoad = true;
    },

    [getProjects.fulfilled]: (state: IProjectSl, action) => {
      if (action.payload.data?.data) {
        const { data } = action.payload.data;

        if (action.payload.projectStatus === ProjectTypes.ACTIVE) {
          state.activeCount = data.projectsCount;
          state.activeProjects = data.Projects;
        } else if (action.payload.projectStatus === ProjectTypes.PAST) {
          state.pastCount = data.projectsCount;
          state.pastProjects = data.Projects;
        } else if (action.payload.projectStatus === ProjectTypes.UPCOMING) {
          state.upcomingCount = data.projectsCount;
          state.upcomingProjects = data.Projects;
        }
        state.isProjectLoaded = true;
      }
      state.projectLoad = false;
    },

    [getProjects.rejected]: (state: IProjectSl, action) => {
      state.projectLoad = false;
      state.projecterror = action.payload?.response?.data.message;
      state.activeProjects = [];
      state.upcomingProjects = [];
      state.pastProjects = [];
    },
  },
});

export const { reset: resetProjectAction } = ProjectSl.actions;
export const ProjectSlice = ProjectSl.reducer;
