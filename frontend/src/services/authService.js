import api from "./api";
const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  localStorage.removeItem("user");
  const response = await api.post("/auth/logout");
  return response.data;
};
const authService = {
  login,
  register,
  logout,
};
export default authService;
