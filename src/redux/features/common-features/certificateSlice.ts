import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { ICertificateSl } from "../../../utils/interfaces";

export const getCerificates: any = createAsyncThunk(
  "getCerificates",
  async () => {
    try {
      const { data } = await API.get(API_ENDPOINTS.CERTIFICATE_GET_ALL);
      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState: ICertificateSl = {
  certificateData: [],
  certificateMsg: "",
  certificateLoad: false,
  certificateOptions: [],
};

const CertificateSl = createSlice({
  name: "getCerificates",
  initialState: initialState,
  reducers: {
    reset: (state: ICertificateSl) => {
      state.certificateMsg = "";
      state.certificateLoad = false;
      state.certificateData = [];
    },
  },

  extraReducers: {
    [getCerificates.pending]: (state: ICertificateSl) => {
      state.certificateLoad = true;
    },

    [getCerificates.fulfilled]: (state: ICertificateSl, action) => {
      if (action.payload.data) {
        state.certificateData = action.payload.data.certData;
      }
      if (action.payload.response?.data.code) {
        state.certificateMsg = action.payload.response.data.message;
      }
      state.certificateLoad = false;
    },

    [getCerificates.rejected]: (state: ICertificateSl, action) => {
      state.certificateLoad = false;
      state.certificateMsg = action.payload.response.data.message;
    },
  },
});

export const { reset: resetCertificateAction } = CertificateSl.actions;
export const CertificateSlice = CertificateSl.reducer;

interface IDownloadCertificateSl {
  downloadCertificateData: [];

  downloadCertificateDataLoading: boolean;

  error: string;
}

//#region DEFINE INITIAL STATE FOR SLICE

const certificateDownload: IDownloadCertificateSl = {
  downloadCertificateData: [],
  downloadCertificateDataLoading: false,
  error: "",
};

//#endregion

//#region DEFINE ASYNCHRONOUS THUNK ACTION TO DOWNLOAD CERTIFICATES

export const downloadEmployeeCertificate: any = createAsyncThunk(
  "downloadEmpCertificate/post",
  async (payload: any, thunkAPI) => {
    try {
      const { CertificationGuId, EmployeeGuID }: any = payload;
      const { data } = await API.post(
        `${API_ENDPOINTS.CERTIFICATE_DOWNLOAD_POST}`,
        { CertificationGuId, EmployeeGuID },

        {
          responseType: "arraybuffer",
        },
      );

      // CREATE A BLOB FROM THE RESPONSE DATA

      const blob = new Blob([data], { type: "application/pdf" });

      // CREATE URL FOR BLOB

      const blobUrl = window.URL.createObjectURL(blob);

      // CREATE AN ANCHOR ELEMENT TO TRIGGER THE DOWNLOAD

      const a = document.createElement("a");

      a.href = blobUrl;
      a.download = payload.fileName;

      // TRIGGER A CLICK EVENT ON THE ANCHOR ELEMENT

      a.click();

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

//#endregion

//#region DEFINE CERTIFICATE DOWNLOAD SLICE

const EmpDownloadCertificateSl = createSlice({
  name: "downloadCertificates",

  initialState: certificateDownload,

  reducers: {
    reset: (state: IDownloadCertificateSl) => {
      state.downloadCertificateData = [];

      state.downloadCertificateDataLoading = false;

      state.error = "";
    },
  },

  extraReducers: {
    [downloadEmployeeCertificate.pending]: (state: IDownloadCertificateSl) => {
      state.downloadCertificateDataLoading = true;
    },

    [downloadEmployeeCertificate.fulfilled]: (
      state: IDownloadCertificateSl,

      action,
    ) => {
      state.downloadCertificateDataLoading = false;

      state.downloadCertificateData = action.payload;
    },

    [downloadEmployeeCertificate.rejected]: (
      state: IDownloadCertificateSl,

      action,
    ) => {
      state.downloadCertificateDataLoading = false;

      state.error = action.error.message;
    },
  },
});

//#endregion

export const { reset: resetDownloadCertificateAction } =
  EmpDownloadCertificateSl.actions;

export const EmpDownloadCertificateSlice = EmpDownloadCertificateSl.reducer;

interface IAddCertificateSl {
  addCertificateData: [];
  addCertificateDataLoading: boolean;
  error: string;
}

//#region DEFINE INITIAL STATE FOR ADD CERTIFICATE POST
const addCertificateInti: IAddCertificateSl = {
  addCertificateData: [],
  addCertificateDataLoading: false,
  error: "",
};
//#endregion

//#region DEFINE ASYNCHRONOUS THUNK ACTION TO ADD EMPLOYEE CERTIFICATE
export const addEmployeeCertificate: any = createAsyncThunk(
  "addEmpCertificate/fetch",
  async (payload, thunkAPI) => {
    try {
      const response = await API.post(
        `${API_ENDPOINTS.CERTIFICATE_ADD_POST}`,
        payload,
      );
      return response;
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
//#endregion

//#region CREATE EMPLOYEE ADD CERTIFICATE SLICE
const EmpAddCertificateSl = createSlice({
  name: "addEmpCertificate/fetch",
  initialState: addCertificateInti,
  reducers: {
    reset: (state: IAddCertificateSl) => {
      state.addCertificateData = [];

      state.addCertificateDataLoading = false;

      state.error = "";
    },
  },
  extraReducers: {
    [addEmployeeCertificate.pending]: (state: IAddCertificateSl) => {
      state.addCertificateDataLoading = true;
    },
    [addEmployeeCertificate.fulfilled]: (state: IAddCertificateSl, action) => {
      state.addCertificateDataLoading = false;
      state.addCertificateData = action.payload;
    },
    [addEmployeeCertificate.rejected]: (state: IAddCertificateSl, action) => {
      state.addCertificateDataLoading = false;
      state.error = action.error.message;
    },
  },
});
//#endregion

export const { reset: resetAddCertificateAction } = EmpAddCertificateSl.actions;
export const EmpAddCertificateSlice = EmpAddCertificateSl.reducer;
