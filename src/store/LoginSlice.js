import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

// ------------------ LOGIN THUNK ------------------
export const loginUser = createAsyncThunk(
  "userLogin/loginUser",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/login", formData);

      const { user, token, message } = response.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      return { user, token, message };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

const userFromStorage = JSON.parse(sessionStorage.getItem("user"));
const tokenFromStorage = sessionStorage.getItem("token");

const loginSlice = createSlice({
  name: "userLogin",
  initialState: {
    user: userFromStorage || null,
    token: tokenFromStorage || null,
    loading: false,
    error: null,
    isLoggedIn: !!tokenFromStorage,
    isLoginDialogOpen: false, // ← dialog state
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
    clearLoginError: (state) => {
      state.error = null;
    },
    openLoginDialog: (state) => {        // ← opens dialog
      state.isLoginDialogOpen = true;
    },
    closeLoginDialog: (state) => {       // ← closes dialog
      state.isLoginDialogOpen = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoginDialogOpen = false; // ← auto-close on login success
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ← make sure all 4 are exported here
export const { logout, clearLoginError, openLoginDialog, closeLoginDialog } = loginSlice.actions;
export default loginSlice.reducer;