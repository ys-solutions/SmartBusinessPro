import { api } from "./api";

export const roleService = {

  getAll() {
    return api.get("/auth/roles/");
  },

};