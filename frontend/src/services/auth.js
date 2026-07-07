import { api } from "./api";

export const authService = {
  login: async (data) => {

    const res = await api.post("/auth/login/", data);

    if (res?.success) {

      localStorage.setItem(
        "token",
        res.data.tokens.access
      );

      localStorage.setItem(
        "refresh",
        res.data.tokens.refresh
      );

    }

    return res;
  },

  logout: () => {

    localStorage.removeItem("token");
    localStorage.removeItem("refresh");

  },
};