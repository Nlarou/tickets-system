import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = ({ neededRole = ["regular", "staff", "admin"] }) => {
  const { loggedIn, loading, currentRole } = useAuthStatus();

  if (loading) {
    return <Spinner />;
  }

  return loggedIn ? (
    neededRole.includes(currentRole) ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
