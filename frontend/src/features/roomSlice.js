import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper to get Token for Admin/Protected actions
export const getToken = () => localStorage.getItem("userToken"); // Or adminToken depending on your auth setup

// --- 1. FETCH ROOMS (Public) ---
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/rooms");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- 2. ADD ROOM (Admin) ---
export const addRoom = createAsyncThunk(
  "rooms/addRoom",
  async (roomData, { rejectWithValue }) => {
    try {
      // Typically admin actions use the admin token
      const token = localStorage.getItem("adminToken"); 
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post("/api/rooms", roomData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- 3. UPDATE ROOM (Admin) ---
export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(`/api/rooms/${id}`, updatedData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- 4. DELETE ROOM (Admin) ---
export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`/api/rooms/${id}`, config);
      return id; // Return ID to remove it from state locally
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- 5. RATE ROOM (User) ---
export const rateRoom = createAsyncThunk(
  "rooms/rateRoom",
  async ({ id, rating, review, userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Note: The endpoint is /api/rooms/:id/rate
      const response = await axios.post(
        `/api/rooms/${id}/rate`,
        { rating, review, userId },
        config
      );
      return { id, newRating: response.data.newRating };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  allRooms: [],
  filteredRooms: [],
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    // --- FILTER LOGIC ---
    filterRooms: (state, action) => {
      const { search, type, price, amenities } = action.payload;

      if (!state.allRooms) return;

      state.filteredRooms = state.allRooms.filter((room) => {
        const roomName = room.name ? room.name.toLowerCase() : "";
        const roomType = room.type || "";
        
        // FIX: Ensure both are converted to Numbers for safe comparison
        const roomPrice = parseFloat(room.price) || 0; 
        const filterPrice = parseFloat(price) || 0;
        
        const roomAmenities = room.amenities || [];

        const matchesSearch = roomName.includes(search.toLowerCase());
        const matchesType = type === "" || roomType === type;
        
        // FIX: Compare Numbers instead of potentially mixed types
        const matchesPrice = roomPrice <= filterPrice; 
        
        const matchesAmenities =
          amenities.length === 0 ||
          amenities.every((amenity) => roomAmenities.includes(amenity));

        return matchesSearch && matchesType && matchesPrice && matchesAmenities;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.allRooms = action.payload;
        // Only set filteredRooms if it's currently empty (first load)
        if (state.filteredRooms.length === 0) {
          state.filteredRooms = action.payload;
        }
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD (Admin)
      .addCase(addRoom.fulfilled, (state, action) => {
        state.allRooms.unshift(action.payload); // Add to top of list
        state.filteredRooms.unshift(action.payload);
      })

      // UPDATE (Admin)
      .addCase(updateRoom.fulfilled, (state, action) => {
        const index = state.allRooms.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.allRooms[index] = action.payload;
          // Update filtered list too
          const fIndex = state.filteredRooms.findIndex((r) => r.id === action.payload.id);
          if (fIndex !== -1) state.filteredRooms[fIndex] = action.payload;
        }
      })

      // DELETE (Admin)
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.allRooms = state.allRooms.filter((room) => room.id !== action.payload);
        state.filteredRooms = state.filteredRooms.filter((room) => room.id !== action.payload);
      })

      // RATE (User)
      .addCase(rateRoom.fulfilled, (state, action) => {
        const { id, newRating } = action.payload;
        const room = state.allRooms.find((r) => r.id === id);
        if (room) {
          room.rating = newRating; // Update rating locally immediately
          room.ratingCount += 1;
        }
      });
  },
});

export const { filterRooms } = roomSlice.actions;
export default roomSlice.reducer;