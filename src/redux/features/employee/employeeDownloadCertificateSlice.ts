import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { IDownloadCertificateSl } from "../../../utils/interfaces";

//#region DEFINE INITIAL STATE FOR SLICE
const initialState: IDownloadCertificateSl = {
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
      const { CertificationGuId }: any = payload;
      const response = await API.post(
        `${API_ENDPOINTS.CERTIFICATE_DOWNLOAD_POST}`,
        { CertificationGuId },
        {
          responseType: "arraybuffer",
        },
      );
      // CREATE A BLOB FROM THE RESPONSE DATA
      const blob = new Blob([response.data], { type: "application/pdf" });

      // CREATE URL FOR BLOB
      const blobUrl = window.URL.createObjectURL(blob);

      // CREATE AN ANCHOR ELEMENT TO TRIGGER THE DOWNLOAD
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = payload.downloadCertName;

      // TRIGGER A CLICK EVENT ON THE ANCHOR ELEMENT
      a.click();

      return response;
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

//#region DEFINE CERTIFICATE DOWNLOAD SLICE
const EmpDownloadCertificateSl = createSlice({
  name: "downloadCertificates",
  initialState,
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
