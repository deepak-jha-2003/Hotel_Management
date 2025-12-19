import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Create Booking (User)
export const createBooking = createAsyncThunk(
  "bookings/create",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/bookings", bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//  Fetch All Bookings (Admin Only)
export const fetchBookings = createAsyncThunk(
  "bookings/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.adminInfo?.token || localStorage.getItem("adminToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("/api/bookings", config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//  Fetch User Bookings (Guest)
export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/bookings/mybookings?email=${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 4. Update Booking Status (Admin Only)
export const updateBookingStatus = createAsyncThunk(
  "bookings/updateStatus",
  async ({ id, status }, { getState, rejectWithValue }) => {
    try {
      // 1. Get Token
      const { auth } = getState();
      const token = auth.adminInfo?.token || localStorage.getItem("adminToken");

      // 2. Attach Header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // 3. Send Request with Config
      const response = await axios.put(`/api/bookings/${id}`, { status }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 5. Delete Booking (Admin Only)
export const deleteBooking = createAsyncThunk(
  "bookings/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.adminInfo?.token || localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.delete(`/api/bookings/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  bookings: [],
  status: "idle",
  error: null,
  lastUpdate: null,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.lastUpdate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createBooking.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Admin Bookings
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
      })
      // Fetch User Bookings
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
      })
      // Update Status
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const updatedBooking = action.payload;
        const index = state.bookings.findIndex((b) => b.id === updatedBooking.id);
        if (index !== -1) {
          state.bookings[index] = updatedBooking;
          
          // Trigger Notification
          state.lastUpdate = {
            id: Date.now(),
            message: `Booking for ${updatedBooking.guestName} marked as ${updatedBooking.status}`,
            type: updatedBooking.status === "Approved" ? "success" : "error"
          };
        }
      })
      // Handle Delete
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
      });
  },
});


export const { clearNotification } = bookingSlice.actions;
export default bookingSlice.reducer;