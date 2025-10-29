import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderService } from "../Services/OrderAPI";

export const OrderPlace = createAsyncThunk(
  "Add/Order",
  async (orderData, { rejectWithValue }) => {
    try {
      console.log("Order data before API:", orderData);

      const res = await OrderService.Orderpost(orderData);

      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const FetchOrderHistory = createAsyncThunk(
  "orders/history",
  async (_, { rejectWithValue }) => {
    try {
      const res = await OrderService.OrderGet();
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// ✅ Get Order by ID
export const FetchOrderById = createAsyncThunk(
  "orders/getById",
  async (orderid, { rejectWithValue }) => {
    console.log("hii");

    try {
      const res = await OrderService.OrderGetByID(orderid);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// ✅ Cancel Order
export const CancelOrder = createAsyncThunk(
  "orders/cancel",
  async ({ orderId, cancel_reason }, { rejectWithValue }) => {
    try {
      const res = await OrderService.CancleOrder({
        order_id: orderId,
        cancel_reason: cancel_reason,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//CancleORder time a pop up value nd show pop up reason
export const CancleReasonOrderQuestion = createAsyncThunk(
  "CancleReasonOrderQuestion/cancel",
  async (_, { rejectWithValue }) => {
    try {
      console.log("hii");

      const res = await OrderService.CancleOrderReasondata();
      console.log("by");

      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  OrderData: [],
  OrderPlaceDetail: [],
  PersonalOrderData: [],
  CancleReasonOrderQuestionData: [],
  OrderLoading: false,
  OrderError: false,
};

export const OrderServices = createSlice({
  name: "OrderOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OrderPlace.pending, (state) => {
        state.OrderLoading = true;
        state.OrderError = null;
      })
      .addCase(OrderPlace.fulfilled, (state, action) => {
        state.OrderPlaceDetail = action.payload.data;

        state.OrderLoading = false;
      })
      .addCase(OrderPlace.rejected, (state, action) => {
        state.OrderLoading = false;
        state.OrderError = action.payload;
      })
      .addCase(FetchOrderHistory.pending, (state) => {
        state.OrderLoading = true;
        state.OrderError = null;
      })
      .addCase(FetchOrderHistory.fulfilled, (state, action) => {
        state.OrderLoading = false;
        state.OrderData = action.payload;
      })
      .addCase(FetchOrderHistory.rejected, (state, action) => {
        state.OrderLoading = false;
        state.OrderError = action.payload;
      })

      .addCase(FetchOrderById.pending, (state) => {
        state.OrderLoading = true;
        state.OrderError = null;
      })
      .addCase(FetchOrderById.fulfilled, (state, action) => {
        state.OrderLoading = false;
        console.log(action.payload.data);

        state.PersonalOrderData = action.payload.data;
      })
      .addCase(FetchOrderById.rejected, (state, action) => {
        state.OrderLoading = false;
        state.OrderError = action.payload;
      })
      .addCase(CancelOrder.pending, (state) => {
        state.OrderLoading = true;
        state.OrderError = null;
      })
      .addCase(CancelOrder.fulfilled, (state, action) => {
        state.OrderLoading = false;
        state.success = action.payload;
      })
      .addCase(CancelOrder.rejected, (state, action) => {
        state.OrderLoading = false;
        state.OrderError = action.payload;
      })
      .addCase(CancleReasonOrderQuestion.pending, (state) => {
        state.OrderLoading = true;
        state.OrderError = null;
      })
      .addCase(CancleReasonOrderQuestion.fulfilled, (state, action) => {
        state.OrderLoading = false;

        state.CancleReasonOrderQuestionData = action.payload.data;
      })
      .addCase(CancleReasonOrderQuestion.rejected, (state, action) => {
        state.OrderLoading = false;
        state.OrderError = action.payload;
      });
  },
});
