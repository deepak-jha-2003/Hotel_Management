import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("userToken");

// 1. Register User
export const registerUser = createAsyncThunk(
  "userAuth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      localStorage.setItem("userToken", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 2. Login User
export const loginUser = createAsyncThunk(
  "userAuth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", userData);
      localStorage.setItem("userToken", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 3. Load User from Database (NEW)
export const loadUser = createAsyncThunk(
  "userAuth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No token found");

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("/api/auth/me", config);
      return response.data;
    } catch (error) {
      localStorage.removeItem("userToken"); 
      return rejectWithValue(error.response?.data?.message || "Session expired");
    }
  }
);

const initialState = {
  isUserLoggedIn: !!getToken(),
  userName: null,
  userEmail: null,
  userId: null,
  token: getToken(),
  loading: false,
  error: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem("userToken");
      state.isUserLoggedIn = false;
      state.userName = null;
      state.userEmail = null;
      state.userId = null;
      state.token = null;
      window.location.href = "/login"; 
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserLoggedIn = true;
        state.userName = action.payload.name;
        state.userEmail = action.payload.email;
        state.userId = action.payload.id;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // LOGIN
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserLoggedIn = true;
        state.userName = action.payload.name;
        state.userEmail = action.payload.email;
        state.userId = action.payload.id;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // LOAD USER (DB Fetch)
      .addCase(loadUser.pending, (state) => { state.loading = true; })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserLoggedIn = true;
        state.userName = action.payload.name;
        state.userEmail = action.payload.email;
        state.userId = action.payload.id;
        // Token is already in state from initial load
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.isUserLoggedIn = false;
        state.userName = null;
        state.token = null;
      });
  },
});

export const { userLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;