import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./Api";

export const fetchPastas = createAsyncThunk(
  "pastas/fetchPastas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/pastas");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch pastas");
    }
  }
);

const pastasSlice = createSlice({
  name: "pastas",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastas.pending, (state) => { state.loading = true; })
      .addCase(fetchPastas.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; })
      .addCase(fetchPastas.rejected, (state, action) => { state.error = action.payload; state.loading = false; });
  }
});

export default pastasSlice.reducer;
