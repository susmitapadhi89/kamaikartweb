import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryService } from "../Services/CategoriesAPI";

export const GetCategoriesData = createAsyncThunk(
  "Categories/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CategoryService.GetAllCategories();
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  CategoriesData: [],
  loading: false,
  error: null,
};

export const CategoryServices = createSlice({
  name: "CategoryOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCategoriesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCategoriesData.fulfilled, (state, action) => {
        state.loading = false;
        state.CategoriesData = action.payload.data;
      })
      .addCase(GetCategoriesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
