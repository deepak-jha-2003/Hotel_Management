import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "../features/roomSlice";
import bookingReducer from "../features/bookingSlice";
import authReducer from "../features/authSlice";
import userAuthReducer from "../features/userAuthSlice";
import contactReducer from "../features/contactSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userAuth: userAuthReducer,
    rooms: roomReducer,
    bookings: bookingReducer,
    contacts: contactReducer,
  },
});