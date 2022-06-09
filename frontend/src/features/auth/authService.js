import axios from "axios";

const API_URL = "/api/users/";
// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Login the user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//get role of the user
const getRole = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getRole", config);
  if (response.data) {
    localStorage.setItem("role", JSON.stringify(response.data));
  }
  return response.data;
};
//update role
const setRole = async (info, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "setRole",
    { role: info.currentRole, email: info.email },
    config
  );

  return response.data;
};
//get role of the user
const getStaffMembers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "getStaffMembers", config);

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  getRole,
  getStaffMembers,
  setRole,
};
export default authService;
