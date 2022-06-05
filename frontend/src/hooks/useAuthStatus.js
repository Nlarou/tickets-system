import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRole } from "../features/auth/authSlice";
export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState("regular");
  const { user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(getRole());
      setLoggedIn(true);
      setCurrentRole(role);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  }, [user, role]);
  return { loggedIn, loading, currentRole };
};
