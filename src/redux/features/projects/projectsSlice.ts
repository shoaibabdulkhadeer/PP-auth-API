import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

export const fetchProjects = createAsyncThunk(
  "projects/fetch",
  async (pageNo: any) => {
    try {
      const { page } = pageNo;
      const res = await API.get(
        `${API_ENDPOINTS.MASTER_GET_PROJECTS}?page=${page}`,
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

export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
  try {
    const res = await API.get(API_ENDPOINTS.FETCH_EMPLOYEES_FULLNAMES);
    return res.data.data;
  } catch (error) {
    throw error;
  }
});

const ProjectsSl = createSlice({
  name: "projects",
  initialState: {
    data: [],
    empData: [],
    projectsLoad: false,
    reload: false,
    open: false,
    add: true,
    error: null,
    prev: [{ FullName: "", DailyAllocatedHours: 0 }],
    projectDetails: {
      ProjectGuId: "",
      ProjectName: "",
      ProjectDescription: "",
      StartDate: dayjs(),
      EndDate: dayjs(),
      FullName: "",
      DailyAllocatedHours: 0,
      EmployeeData: [{ FullName: "", DailyAllocatedHours: 0 }],
    },
  },
  reducers: {
    handleOpen: (state: any) => {
      state.projectDetails = {
        ProjectName: "",
        ProjectDescription: "",
        StartDate: null,
        EndDate: null,
        EmployeeData: [{ FullName: "", DailyAllocatedHours: 0 }],
      };
      state.open = true;
      state.add = true;
    },
    handleClose: (state: any) => {
      state.open = false;
    },
    handleEdit: (state: any, action) => {
      state.projectDetails = action.payload;
      state.prev = action.payload.EmployeeData;
      state.projectDetails.EmployeeData = state.prev;
      state.add = false;
      state.open = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state: any) => {
        state.projectsLoad = true;
        state.data = [];
      })
      .addCase(fetchProjects.fulfilled, (state: any, action) => {
        state.projectsLoad = false;
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state: any) => {
        state.projectsLoad = false;
        state.data = [];
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.empData = action.payload;
      });
  },
});

export const ProjectsSlice = ProjectsSl.reducer;
export const { handleClose, handleOpen, handleEdit } = ProjectsSl.actions;
