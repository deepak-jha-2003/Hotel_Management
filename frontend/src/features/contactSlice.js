import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1. Send Message
export const sendMessage = createAsyncThunk(
  "contacts/send",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/contacts", contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 2. Fetch Messages
export const fetchMessages = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.adminInfo?.token || localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const response = await axios.get("/api/contacts", config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// 3. Delete Message (NEW)
export const deleteMessage = createAsyncThunk(
  "contacts/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.adminInfo?.token || localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.delete(`/api/contacts/${id}`, config);
      return id; // Return ID to remove from UI
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState: { messages: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => { state.status = "loading"; })
      .addCase(sendMessage.fulfilled, (state) => { state.status = "succeeded"; })
      .addCase(sendMessage.rejected, (state, action) => { 
        state.status = "failed"; 
        state.error = action.payload; 
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      // Handle Delete
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((msg) => msg.id !== action.payload);
      });
  },
});

export default contactSlice.reducer;