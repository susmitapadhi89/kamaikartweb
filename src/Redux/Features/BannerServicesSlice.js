import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BannerService } from "../Services/BannerAPI";
import { OfferBannerService } from "../Services/OfferAPI";

export const GetBannerData = createAsyncThunk(
  "Banner/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await BannerService.GetAllBanner();

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const GetOfferBannerData = createAsyncThunk(
  "offerbanner/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await OfferBannerService.GetOfferBanner();
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  BannerData: [],
  OfferbannerData: [], // ⬅️ fixed

  Bannerloading: false,
  Offerloading: false, // ⬅️ fixed

  Bannererror: null,
  Offererror: null, //
};

export const BannerServices = createSlice({
  name: "BannerOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBannerData.pending, (state) => {
        state.Bannerloading = true;
        state.Bannererror = null;
      })
      .addCase(GetBannerData.fulfilled, (state, action) => {
        state.Bannerloading = false;

        const image = action.payload.data.map((item) => item.image);

        state.BannerData = image;
      })
      .addCase(GetBannerData.rejected, (state, action) => {
        state.Bannerloading = false;
        state.Bannererror = action.payload;
      })

      .addCase(GetOfferBannerData.pending, (state) => {
        state.Offerloading = true;
        state.Offererror = null;
      })
      .addCase(GetOfferBannerData.fulfilled, (state, action) => {
        state.Offerloading = false;

        state.OfferbannerData = action.payload.data;
      })
      .addCase(GetOfferBannerData.rejected, (state, action) => {
        state.Offerloading = false;
        state.Offererror = action.payload;
      });
  },
});
