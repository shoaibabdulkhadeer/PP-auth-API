import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";
import { ModalDataType } from "../../../utils/interfaces";

//#region get Employee Data
export const getModalData: any = createAsyncThunk(
  "api/dashboard/employees",
  async (empID: string) => {
    try {
      const { data } = await API.get(`${API_ENDPOINTS.MODAL_DATA}/${empID}`);
      return data;
    } catch (error) {
      return error;
    }
  },
);
//#endregion

const basicInfoData = {
  FullName: "",
  Username: "",
  Email: "",
  Designation: "",
  JoiningDate: "",
  ReportingManagerName: null,
  HourlyCost: 0,
  YearsOfExperience: 0,
  DepartmentName: "",
};

const initialState: ModalDataType = {
  modalData: {
    BasicInfo: basicInfoData,
    Project: [],
    Skills: [],
    Certification: [],
  },
  modalState: false,
  modalLoading: false,
  modalError: "",
};

//#region  Slice for handling Employee Data
const ModalDataSl = createSlice({
  name: "modalData",

  initialState: initialState,

  reducers: {
    reset: (state: ModalDataType) => {
      state.modalData = {
        BasicInfo: basicInfoData,
        Project: [],
        Skills: [],
        Certification: [],
      };
      state.modalState = false;
      state.modalLoading = false;
      state.modalError = "";
    },

    setModalOpen: (state: ModalDataType, action) => {
      state.modalState = action.payload;
    },
  },
  extraReducers: {
    [getModalData.pending]: (state: ModalDataType) => {
      state.modalLoading = true;
    },

    [getModalData.fulfilled]: (state: ModalDataType, action) => {
      state.modalLoading = false;
      if (action.payload.code === 200) {
        state.modalData = action.payload.data;
      }
      state.modalError = "";
    },

    [getModalData.rejected]: (state: any, action) => {
      state.modalLoading = false;
      state.modalError = action.payload.response.data.message;
      state.modalData = {};
    },
  },
});
//#endregion

export const { reset: resetModalAction, setModalOpen } = ModalDataSl.actions;
export const ModalDataSlice = ModalDataSl.reducer;
