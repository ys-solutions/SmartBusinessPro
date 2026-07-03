import { api } from "./api";

export const authService = {
  login: async (data) => {
    const res = await api.post("/auth/login/", data);

    if (res?.data?.access) {
      localStorage.setItem("token", res.data.access);
    }

    return res;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};