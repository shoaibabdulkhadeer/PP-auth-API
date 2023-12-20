import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import {
  IEmpSkillDiable,
  IEmpSkillGetSl,
  IEmpSkillPostSl,
  IRMRatingSl,
} from "../../../utils/interfaces";

export const getEmpSkillApi: any = createAsyncThunk(
  "getEmpSkillApi",
  async (id: string) => {
    try {
      const { data } = await API.get(
        `${API_ENDPOINTS.EMPLOYEE_SKILL_GET}/${id}`,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
);

const skillState: IEmpSkillGetSl = {
  empSkillData: [],
  empSkillMsg: "",
  empSkillLoad: false,
};

const EmpGetSkillSl = createSlice({
  name: "getEmpSkillApi",
  initialState: skillState,
  reducers: {
    reset: (state: IEmpSkillGetSl) => {
      state.empSkillData = [];
      state.empSkillMsg = "";
      state.empSkillLoad = false;
    },
  },

  extraReducers: {
    [getEmpSkillApi.pending]: (state: IEmpSkillGetSl) => {
      state.empSkillLoad = true;
    },

    [getEmpSkillApi.fulfilled]: (state: IEmpSkillGetSl, action) => {
      if (action.payload.code) {
        state.empSkillData = action.payload.data?.Skills;
      }
      if (action.payload.response?.data.code) {
        state.empSkillMsg = action.payload.response.data.message;
      }

      state.empSkillLoad = false;
    },

    [getEmpSkillApi.rejected]: (state: IEmpSkillGetSl, action) => {
      state.empSkillLoad = false;
      state.empSkillMsg = action.payload.response.data.message;
    },
  },
});

export const { reset: empResetGetSkillAction } = EmpGetSkillSl.actions;
export const EmpGetSkillSlice = EmpGetSkillSl.reducer;

//Employee Skill Posting

export const postEmpSkillApi: any = createAsyncThunk(
  "postEmpSkill",
  async (payload: any) => {
    try {
      const skillGuid = {
        SkillGuId: payload.SkillGuId,
      };
      const { data } = await API.post(
        `${API_ENDPOINTS.EMPLOYEE_SKILL_POST}/${payload.empID}`,
        skillGuid,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
);

const postSkillInit: IEmpSkillPostSl = {
  empSkillPostMsg: "",
  empSkillPostLoad: false,
  empSkillPostCode: 0,
};

const PostEmpSkillSl = createSlice({
  name: "postEmpSkill",
  initialState: postSkillInit,
  reducers: {
    reset: (state: IEmpSkillPostSl) => {
      state.empSkillPostCode = 0;
      state.empSkillPostMsg = "";
      state.empSkillPostLoad = false;
    },
  },

  extraReducers: {
    [postEmpSkillApi.pending]: (state: IEmpSkillPostSl) => {
      state.empSkillPostLoad = true;
    },

    [postEmpSkillApi.fulfilled]: (state: IEmpSkillPostSl, action) => {
      if (action.payload.code) {
        state.empSkillPostCode = action.payload.code;
        state.empSkillPostMsg = action.payload.message;
      }
      if (action.payload.response?.data.code) {
        state.empSkillPostMsg = action.payload.response.data.message;
        state.empSkillPostCode = action.payload.response.data.code;
      }

      state.empSkillPostLoad = false;
    },

    [postEmpSkillApi.rejected]: (state: IEmpSkillPostSl, action) => {
      state.empSkillPostLoad = false;
      state.empSkillPostMsg = action.payload.response.data.message;
    },
  },
});

export const { reset: empResetPostSkillSlAction } = PostEmpSkillSl.actions;
export const PostEmpSkillSlice = PostEmpSkillSl.reducer;

//DISABLE EMPLOYEE SKILL
export const disableEmpSkillApi: any = createAsyncThunk(
  "disableEmpSkillApi",
  async (skillMappingsGuid: any) => {
    try {
      const { data } = await API.patch(
        `${API_ENDPOINTS.EMPLOYEE_SKILL_DELETE}/${skillMappingsGuid}`,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
);

const diableEmpSkillInit: IEmpSkillDiable = {
  empSkillDisMsg: "",
  empSkillDisLoad: false,
  empSkillDisCode: 0,
};

const DisableEmpSkillSl = createSlice({
  name: "disableEmpSkillApi",
  initialState: diableEmpSkillInit,
  reducers: {
    reset: (state: IEmpSkillDiable) => {
      state.empSkillDisCode = 0;
      state.empSkillDisMsg = "";
      state.empSkillDisLoad = false;
    },
  },

  extraReducers: {
    [postEmpSkillApi.pending]: (state: IEmpSkillDiable) => {
      state.empSkillDisLoad = true;
    },

    [postEmpSkillApi.fulfilled]: (state: IEmpSkillDiable, action) => {
      if (action.payload.code) {
        state.empSkillDisCode = action.payload.code;
        state.empSkillDisMsg = action.payload.message;
      }
      if (action.payload.response?.data.code) {
        state.empSkillDisMsg = action.payload.response.data.message;
        state.empSkillDisCode = action.payload.response.data.code;
      }

      state.empSkillDisLoad = false;
    },

    [postEmpSkillApi.rejected]: (state: IEmpSkillDiable, action) => {
      state.empSkillDisLoad = false;
      state.empSkillDisMsg = action.payload.response.data.message;
    },
  },
});

export const { reset: empResetDisableSkillAction } = DisableEmpSkillSl.actions;
export const DisableEmpSkillSlSlice = DisableEmpSkillSl.reducer;

//RM Skill Rating State
export const patchRmRatingApi: any = createAsyncThunk(
  "patchRmRatingApi",
  async (payload: any) => {
    try {
      const rating = {
        ReportingManagerRating: payload.rmSkilRating,
      };

      const { data } = await API.patch(
        `${API_ENDPOINTS.RMSKILL_RATING_PATCH}/${payload.skillMappingsGuid}`,
        rating,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
);
const rmRatingInit: IRMRatingSl = {
  rmRatingMsg: "",
  rmRatingLoad: false,
  rmRatingCode: 0,
};

const RmSkillRatingSl = createSlice({
  name: "patchRmRatingApi",
  initialState: rmRatingInit,
  reducers: {
    reset: (state: IRMRatingSl) => {
      state.rmRatingCode = 0;
      state.rmRatingMsg = "";
      state.rmRatingLoad = false;
    },
  },

  extraReducers: {
    [patchRmRatingApi.pending]: (state: IRMRatingSl) => {
      state.rmRatingLoad = true;
    },

    [patchRmRatingApi.fulfilled]: (state: IRMRatingSl, action) => {
      if (action.payload.code) {
        state.rmRatingCode = action.payload.code;
        state.rmRatingMsg = action.payload.message;
      }
      if (action.payload.response?.data.code) {
        state.rmRatingMsg = action.payload.response.data.message;
        state.rmRatingCode = action.payload.response.data.code;
      }

      state.rmRatingLoad = false;
    },

    [patchRmRatingApi.rejected]: (state: IRMRatingSl, action) => {
      state.rmRatingLoad = false;
      state.rmRatingMsg = action.payload.response.data.message;
    },
  },
});

export const { reset: rmResetSkillRatingAction } = RmSkillRatingSl.actions;
export const RmSkillRatingSlice = RmSkillRatingSl.reducer;
