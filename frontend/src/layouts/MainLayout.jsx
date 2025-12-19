import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserNotifications from "../components/UserNotifications";
import usePolling from "../hooks/usePolling";
import { fetchRooms } from "../features/roomSlice"; 

const MainLayout = () => {
  
  usePolling(fetchRooms, 5000);

  return (
    <div className="flex flex-col min-h-screen bg-beige">
      <Navbar />
      <UserNotifications /> 
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;