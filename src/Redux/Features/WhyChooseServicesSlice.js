import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WHyChooseService } from "../Services/WhyChooseAPI";

export const getAllWhyChoose = createAsyncThunk(
  "Role/GetAllRole",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().AuthOpration.token;

      const res = await WHyChooseService.GetAllWhyChoose(token);
      return res.data; // return only data
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  WhyChooseData: [],
  loading: false,
  error: null,
};

export const WhychooseServices = createSlice({
  name: "WhychooseOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  Get item
      .addCase(getAllWhyChoose.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWhyChoose.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.WhyChooseData = action.payload;
      })
      .addCase(getAllWhyChoose.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
