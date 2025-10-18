import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoleServices } from "../Services/RoleApi";
import { AuthServices } from "../Services/AuthAPi";

// ============================
// 🌀 Async Thunks
// ============================

export const Login = createAsyncThunk(
  "/Login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AuthServices.Login(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const Register = createAsyncThunk(
  "/Register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AuthServices.Register(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const Logout = createAsyncThunk(
  "/Logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthServices.LogOut();

      return res; // return only data
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);
export const UserProfile = createAsyncThunk(
  "/UserInfo",
  async (__, { rejectWithValue }) => {
    try {
      const res = await AuthServices.getUserProfile();

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // load from storage
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  loading: false,
  error: null,
  showAuthModal: false, // modal state
};

export const AuthService = createSlice({
  name: "authOpration",
  initialState,
  reducers: {
    openAuthModal: (state) => {
      state.showAuthModal = true;
    },
    closeAuthModal: (state) => {
      state.showAuthModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET Main
      .addCase(Login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true; // ✅ Add this line

        state.user = action.payload.data.user;
        state.showAuthModal = false;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      })

      .addCase(Login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload.message;
      })

      .addCase(Register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(Register.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true; // ✅ Add this line

        state.user = action.payload.data.user;

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      })

      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(UserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;

        localStorage.setItem(
          "userinfo",
          JSON.stringify(action.payload.data.user)
        );
      })

      .addCase(UserProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(Logout.pending, (state) => {
        state.isLoggedIn = false;
        state.loading = true;
        state.error = null;
      })

      .addCase(Logout.fulfilled, (state) => {
        state.isLoggedIn = false;

        state.isLoggedIn = false;
        state.loading = false;
        state.user = null; // ✅ save user data
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
      })

      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { openAuthModal, closeAuthModal } = AuthService.actions;
