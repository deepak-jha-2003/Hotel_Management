import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRooms } from "./features/roomSlice";
import { loadUser } from "./features/userAuthSlice"; // Import loadUser
import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/guest/HomePage";
import RoomListingPage from "./pages/guest/RoomListingPage";
import RoomDetailsPage from "./pages/guest/RoomDetailsPage";
import BookingPage from "./pages/guest/BookingPage";
import FeedbackPage from "./pages/guest/FeedbackPage";
import PaymentPage from "./pages/guest/PaymentPage";
import ConfirmationPage from "./pages/guest/ConfirmationPage";
import AccountPage from "./pages/guest/AccountPage";
import UserLoginPage from "./pages/guest/UserLoginPage";

// Admin Imports
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ManageRoomsPage from "./pages/admin/ManageRoomsPage";
import ManageBookingsPage from "./pages/admin/ManageBookingsPage";
import GuestRecordsPage from "./pages/admin/GuestRecordsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";

import ProtectedRoute from "./components/ProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Fetch Global Data
    dispatch(fetchRooms());

    // 2. Restore User Session from Database
    dispatch(loadUser());
  }, [dispatch]);

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* --- GUEST INTERFACE --- */}
        <Route
          path="/"
          element={
            <UserProtectedRoute>
              <MainLayout />
            </UserProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="rooms" element={<RoomListingPage />} />
          <Route path="rooms/:id" element={<RoomDetailsPage />} />
          <Route path="book/:id" element={<BookingPage />} />
          <Route path="contact" element={<FeedbackPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="confirmation" element={<ConfirmationPage />} />
        </Route>

        {/* --- ADMIN INTERFACE --- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="rooms" element={<ManageRoomsPage />} />
          <Route path="bookings" element={<ManageBookingsPage />} />
          <Route path="guests" element={<GuestRecordsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;