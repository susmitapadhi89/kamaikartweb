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

export const CreateWhyChoose = createAsyncThunk(
  "whyChoose/create",
  async (data, { rejectWithValue, getState }) => {
    try {
      const token = getState().AuthOpration.token;
      const res = WHyChooseService.AddWhyChoosedata(data, token);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
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
      })

      //  add new item
      .addCase(CreateWhyChoose.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateWhyChoose.fulfilled, (state, action) => {
        state.loading = false;
        state.WhyChooseData.push(action.payload);
      })
      .addCase(CreateWhyChoose.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
