import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEmpStatusSl } from "../../../utils/interfaces";

export const updateEmpStatus: any = createAsyncThunk(
  "updateEmpStatus",
  async (id: string) => {
    try {
      const { data } = await API.patch(
        `${API_ENDPOINTS.EMPLOYEE_MANAGE_STATUS}/${id}`,
      );
      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState: IEmpStatusSl = {
  empStatusRes: "",
  empStatusLoad: false,
  empStatusCode: 0,
};

const EmpStatusSl = createSlice({
  name: "updateEmpStatus",
  initialState: initialState,
  reducers: {
    reset: (state: IEmpStatusSl) => {
      state.empStatusCode = 0;
      state.empStatusLoad = false;
      state.empStatusRes = "";
    },
  },

  extraReducers: {
    [updateEmpStatus.pending]: (state: IEmpStatusSl) => {
      state.empStatusLoad = true;
    },

    [updateEmpStatus.fulfilled]: (state: IEmpStatusSl, action) => {
      if (action.payload.code) {
        state.empStatusCode = action.payload.code;
        state.empStatusRes = action.payload.message;
      }
      if (action.payload.response?.data.code) {
        state.empStatusCode = action.payload.response.data.code;
        state.empStatusRes = action.payload.response.data.message;
      }

      state.empStatusLoad = false;
    },

    [updateEmpStatus.rejected]: (state: IEmpStatusSl, action) => {
      state.empStatusLoad = false;
      state.empStatusRes = action.payload.response.data.message;
    },
  },
});

export const { reset: empResetStatusAction } = EmpStatusSl.actions;
export const EmpStatusSlice = EmpStatusSl.reducer;
