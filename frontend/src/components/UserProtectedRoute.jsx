import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const { isUserLoggedIn } = useSelector((state) => state.userAuth);

  if (!isUserLoggedIn) {
    // If not logged in, redirect them to the new /login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, show the page they asked for
  return children;
};

export default UserProtectedRoute;