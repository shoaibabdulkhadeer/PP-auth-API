import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../config/axios.config";
import { API_ENDPOINTS } from "../../../shared/api-endpoint";

//#region updating availability
export const isDefaultPatch: any = createAsyncThunk(
  "isDefault/Patch",
  async (roleid: any) => {
    try {
      const res = await API.patch(
        `${API_ENDPOINTS.ISDEFAULT_UPDATE}/${roleid}`,
      );
      return res;
    } catch (error) {
      return error;
    }
  },
);
//#endregion

export const switchRolesThunk: any = createAsyncThunk(
  "switchRoles/Patch",
  async ({ roleid, roleName }: any) => {
    try {
      const res = await API.post(
        `${API_ENDPOINTS.SWITCH_ROLES}?roleid=${roleid}&roleName=${roleName}`,
      );
      sessionStorage.setItem("role", roleName);
      return res;
    } catch (error) {
      return error;
    }
  },
);

export const getRolesEmp: any = createAsyncThunk("getRolesEmp", async () => {
  try {
    const { data } = await API.get(`${API_ENDPOINTS.EMP_ROLES}`);
    return data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  currentRole: null,
  data: [],
  addData: [],
  updateData: [],
  providers: [],
  isLoading: false,
  load: false,
  selectedRoleName: null,
};

const switchRoles = createSlice({
  name: "switchroles",
  initialState,
  reducers: {
    setCurrentRolereducer(state, action) {
      state.currentRole = action.payload;
    },
    setSelectedRoleName(state, action) {
      state.selectedRoleName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(isDefaultPatch.fulfilled, (state: any, action) => {
        state.updateData = action.payload;
        state.load = !state.load;
      })
      .addCase(isDefaultPatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isDefaultPatch.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(switchRolesThunk.fulfilled, (state, action) => {
        state.currentRole = action.payload;
        state.selectedRoleName = action.meta.arg.roleName;
      });
  },
});

export const { setCurrentRolereducer, setSelectedRoleName } =
  switchRoles.actions;

export const switchRolesSlice = switchRoles.reducer;
