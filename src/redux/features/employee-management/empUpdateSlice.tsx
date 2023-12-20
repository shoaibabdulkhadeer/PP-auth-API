import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEmpUpdate } from "../../../utils/interfaces";

export const updateEmpDetailsApi: any = createAsyncThunk(
  "updateEmpDetailsApi",
  async (updatedData: any) => {
    try {
      const id = updatedData.id;
      const { data } = await API.put(
        `${API_ENDPOINTS.EMPLOYEE_MANAGE_UPDATE}/${id}`,
        updatedData.UpdatedDetails,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState: IEmpUpdate = {
  empUpdateRes: "",
  empUpdateCode: 0,
  empUpdateLoad: false,
};

const EmpUpdateSl = createSlice({
  name: "updateEmpDetailsApi",
  initialState: initialState,
  reducers: {
    reset: (state: IEmpUpdate) => {
      state.empUpdateRes = "";
      state.empUpdateLoad = false;
      state.empUpdateCode = 0;
    },
  },

  extraReducers: {
    [updateEmpDetailsApi.pending]: (state: IEmpUpdate) => {
      state.empUpdateLoad = true;
    },

    [updateEmpDetailsApi.fulfilled]: (state: IEmpUpdate, action) => {
      state.empUpdateLoad = false;
      if (action.payload.code) {
        state.empUpdateCode = action.payload.code;
        state.empUpdateRes = action.payload.message;
      }
      if (action.payload?.response?.data?.code) {
        state.empUpdateCode = action.payload.response.data.code;
        state.empUpdateRes = action.payload.response.data.message;
      }
      state.empUpdateLoad = false;
    },

    [updateEmpDetailsApi.rejected]: (state: IEmpUpdate, action) => {
      state.empUpdateLoad = false;
      state.empUpdateRes = action.payload.response.data.message;
      state.empUpdateRes = "";
    },
  },
});

export const { reset: resetEmpUpdateAction } = EmpUpdateSl.actions;
export const EmpUpdateSlice = EmpUpdateSl.reducer;
