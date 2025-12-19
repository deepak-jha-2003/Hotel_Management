import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import { FaBars, FaSignOutAlt } from "react-icons/fa";

const AdminTopbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-soft-white shadow-md p-4 flex justify-between items-center md:hidden">
      {/* Hamburger Button (Mobile only) */}
      <button onClick={toggleSidebar} className="text-deep-brown">
        <FaBars size={24} />
      </button>

      {/* Logo for Mobile  */}
      <h2 className="text-2xl font-heading text-gold">Serenity</h2>

      {/* Logout Button*/}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 text-red-500 hover:text-red-700"
        title="Logout"
      >
        <FaSignOutAlt size={20} />
      </button>
    </header>
  );
};

export default AdminTopbar;