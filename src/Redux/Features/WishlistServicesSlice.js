import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WishlistService } from "../Services/WishlistAPI";

export const GetAllWishlistdata = createAsyncThunk(
  "get/Wishllist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await WishlistService.GetAllWishlist();

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const AddWishlist = createAsyncThunk(
  "Add/Wishllist",
  async ({ product_id }, { rejectWithValue }) => {
    try {
      const res = await WishlistService.AddtoWishlist(product_id);

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
// Remove from wishlist API
export const RemoveWishlist = createAsyncThunk(
  "wishlist/RemoveWishlist",
  async ({ productid }, { rejectWithValue }) => {
    try {
      await WishlistService.DeleteWishlist(productid);
      return { id: productid };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  Wishlistitem: [],
  Wishlistloading: false,
  Wishlisterror: null,
};

export const WishlistServices = createSlice({
  name: "WishlistOpration",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.Wishlistitem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET Main
      .addCase(AddWishlist.pending, (state) => {
        state.Wishlistloading = true;
        state.Wishlisterror = null;
      })
      .addCase(AddWishlist.fulfilled, (state, action) => {
        state.Wishlistloading = false;
        // Add the returned product id if not already in array
        if (!state.Wishlistitem.includes(action.payload.id)) {
          state.Wishlistitem.push(action.payload.id);
        }
      })

      .addCase(AddWishlist.rejected, (state, action) => {
        state.Wishlistloading = false;
        state.Wishlisterror = action.payload;
      })
      .addCase(RemoveWishlist.pending, (state) => {
        state.Wishlistloading = true;
        state.Wishlisterror = null;
      })
      .addCase(RemoveWishlist.fulfilled, (state, action) => {
        const productid = action.meta.arg.productid;
        state.Wishlistitem = state.Wishlistitem.filter(
          (item) => item.id !== productid
        );

        state.Wishlistloading = false;
      })

      .addCase(RemoveWishlist.rejected, (state, action) => {
        state.Wishlistloading = false;
        state.Wishlisterror = action.payload;
      })
      .addCase(GetAllWishlistdata.pending, (state) => {
        state.Wishlistloading = true;
        state.Wishlisterror = null;
      })
      .addCase(GetAllWishlistdata.fulfilled, (state, action) => {
        state.Wishlistitem = action.payload;
        state.Wishlistloading = false;
        state.Wishlisterror = null;
      })

      .addCase(GetAllWishlistdata.rejected, (state, action) => {
        state.Wishlistloading = false;
        state.Wishlisterror = action.payload;
      });
  },
});
export const { setWishlist } = WishlistServices.actions;
