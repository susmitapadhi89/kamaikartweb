import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddressService } from "../Services/AddressAPI"; // ✅ You must create this service file

// ============================
// 🌀 Async Thunks
// ============================

// Add new address
export const addUserAddress = createAsyncThunk(
  "address/add",
  async (addressData, { rejectWithValue }) => {
    try {
      const res = await AddressService.ADDAddress(addressData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update existing address
export const updateUserAddress = createAsyncThunk(
  "address/update",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const res = await AddressService.UpdateAddress(id, updateData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete an address
export const deleteUserAddress = createAsyncThunk(
  "address/delete",
  async (id, { rejectWithValue }) => {
    try {
      await AddressService.DeleteAddress(id);
      return id; // return the deleted ID to update state
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get a single address
export const getSingleUserAddress = createAsyncThunk(
  "address/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await AddressService.GetSingleAddress(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get all addresses
export const getAllUserAddress = createAsyncThunk(
  "address/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AddressService.GetAllAddress();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ============================
// 🌀 Initial State
// ============================

const initialState = {
  addresses: [],
  singleAddress: null,
  loading: false,
  error: null,
};

// ============================
// 🌀 Slice
// ============================

export const UserAddressServices = createSlice({
  name: "UserAddressOpration",
  initialState,
  reducers: {
    resetSingleAddress: (state) => {
      state.singleAddress = null;
    },
  },
  extraReducers: (builder) => {
    // Add
    builder
      .addCase(addUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addresses.findIndex(
          (addr) => addr.id === action.payload.id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr.id !== action.payload
        );
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUserAddress.fulfilled, (state, action) => {
        state.loading = false;

        console.log(state.singleAddress);
        state.singleAddress = action.payload;
      })
      .addCase(getSingleUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(getAllUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ============================
// 🌀 Exports
// ============================

export const { resetSingleAddress } = UserAddressServices.actions;
