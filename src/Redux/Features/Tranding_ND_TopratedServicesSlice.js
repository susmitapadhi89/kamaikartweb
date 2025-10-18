import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Tranding_nd_TopratedService } from "../Services/Tranding_nd_TopratedAPI";

// ============================
// 🌀 Async Thunks
// ============================

export const GetTrandingdata = createAsyncThunk(
  "Tranding/GetAllTranding",
  async (rejectWithValue) => {
    try {
      const res = await Tranding_nd_TopratedService.GetAllTrandingProduct();

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const GetToprateddata = createAsyncThunk(
  "Toprated/GetAllToprated",
  async (rejectWithValue) => {
    try {
      const res = await Tranding_nd_TopratedService.GetAllTopratedProduct();

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  TrandingData: [],
  TopratedData: [],
  Trandingloading: false,
  Trandingerror: null,
};

export const Tranding_nd_TopratedServices = createSlice({
  name: "Tranding_nd_TopratedOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET Main
      .addCase(GetTrandingdata.pending, (state) => {
        state.Trandingloading = true;
        state.Trandingerror = null;
      })
      .addCase(GetTrandingdata.fulfilled, (state, action) => {
        state.Trandingloading = false;
        state.TrandingData = action.payload;
      })
      .addCase(GetTrandingdata.rejected, (state, action) => {
        state.Trandingloading = false;
        state.Trandingerror = action.payload;
      })
      .addCase(GetToprateddata.pending, (state) => {
        state.Trandingloading = true;
        state.Trandingerror = null;
      })
      .addCase(GetToprateddata.fulfilled, (state, action) => {
        state.Trandingloading = false;
        state.TopratedData = action.payload;
      })
      .addCase(GetToprateddata.rejected, (state, action) => {
        state.Trandingloading = false;
        state.Trandingerror = action.payload;
      });
  },
});
