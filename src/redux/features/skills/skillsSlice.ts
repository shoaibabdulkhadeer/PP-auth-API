import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

export const fetchSkills = createAsyncThunk(
  "skills/fetch",
  async (pageNo: any) => {
    try {
      const { page } = pageNo;
      const res = await API.get(
        `${API_ENDPOINTS.MASTER_GET_SKILLS}?page=${page}`,
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

export const fetchSkillTagname = createAsyncThunk("skillTag/get", async () => {
  try {
    const res = await API.get(API_ENDPOINTS.MASTER_GET_SKILLTAGNAMES);
    return res.data;
  } catch (error) {
    throw error;
  }
});

const SkillsSl = createSlice({
  name: "skills",
  initialState: {
    data: [],
    tagData: [],
    disableData: [],
    skillsLoad: false,
    open: false,
    add: true,
    reload: false,
    skillsDetails: {
      SkillGuId: "",
      SkillName: "",
      SkillDescription: "",
      SkillTagName: "",
    },
  },
  reducers: {
    handleOpen: (state: any) => {
      state.skillsDetails = {
        SkillGuId: "",
        SkillName: "",
        SkillDescription: "",
        SkillTagName: "",
      };
      state.open = true;
      state.add = true;
    },
    handleClose: (state: any) => {
      state.open = false;
    },
    handleEdit: (state: any, action) => {
      state.skillsDetails = action.payload;
      state.add = false;
      state.open = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.skillsLoad = true;
        state.data = [];
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skillsLoad = false;

        state.data = action.payload;
      })
      .addCase(fetchSkills.rejected, (state) => {
        state.skillsLoad = false;
        state.data = [];
      })
      .addCase(fetchSkillTagname.fulfilled, (state, action) => {
        state.skillsLoad = false;
        state.tagData = action.payload;
      });
  },
});

export const SkillsSlice = SkillsSl.reducer;
export const { handleOpen, handleClose, handleEdit } = SkillsSl.actions;
