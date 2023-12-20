import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../../config/axios.config";

import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IEmpCertificateSl } from "../../../utils/interfaces";

// Define an initial state for your slice

const initialState: IEmpCertificateSl = {
  certificateData: [], // The fetched data will be stored here
  certificateDataLoading: false, // Possible values: 'idle', 'loading', 'succeeded', 'failed'
  error: "",
  certificateCode: 0,
};

// Define an asynchronous thunk action to fetch certificates

export const fetchCertificatesById: any = createAsyncThunk(
  "employeeCertificates/fetch",

  async (employeeGuid: string) => {
    try {
      const { data } = await API.get(
        `${API_ENDPOINTS.EMPLOYEE_CERTIFICATE_GET}/${employeeGuid}`,
      );

      return data;
    } catch (error) {
      throw error;
    }
  },
);

const EmpCertificateSl = createSlice({
  name: "employeeCertificates",

  initialState,

  reducers: {
    reset: (state: IEmpCertificateSl) => {
      state.certificateData = [];
      state.certificateDataLoading = false;
      state.error = "";
    },
  },

  extraReducers: {
    //FETCH EMPLOYEE BASIC INFO SECTION

    [fetchCertificatesById.pending]: (state: IEmpCertificateSl) => {
      state.certificateDataLoading = true;
    },

    [fetchCertificatesById.fulfilled]: (state: IEmpCertificateSl, action) => {
      state.certificateDataLoading = false;
      state.certificateData = action.payload.data;
    },

    [fetchCertificatesById.rejected]: (state: IEmpCertificateSl, action) => {
      state.certificateDataLoading = false;

      state.error = action.error.message;
    },
  },
});

export const { reset: resetEmpCertificateAction } = EmpCertificateSl.actions;

export const EmpGetCertificateSlice = EmpCertificateSl.reducer;
