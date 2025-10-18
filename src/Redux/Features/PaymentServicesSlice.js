import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PaymentService } from "../Services/PaymentAPI";

export const PaymentInfo = createAsyncThunk(
  "get/payment",
  async (_, { rejectWithValue }) => {
    try {
      const res = await PaymentService.PaymentList();
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  PaymentData: [],
  PaymentLoading: false,
  PaymentError: false,
};

export const PaymentServices = createSlice({
  name: "PaymentOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PaymentInfo.pending, (state) => {
        state.PaymentLoading = true;
        state.PaymentError = null;
      })
      .addCase(PaymentInfo.fulfilled, (state, action) => {
        state.PaymentData = action.payload.data;

        state.PaymentLoading = false;
      })
      .addCase(PaymentInfo.rejected, (state, action) => {
        state.loading = false;
        state.PaymentError = action.payload;
      });
  },
});
