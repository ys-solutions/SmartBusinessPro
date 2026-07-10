import { api } from "./api";

export const userService = {
  getAll() {
    return api.get("/auth/users/");
  },

  get(id) {
    return api.get(`/auth/users/${id}/`);
  },

  create(data) {
    return api.post("/auth/users/", data);
  },

  update(id, data) {
    return api.put(`/auth/users/${id}/`, data);
  },

  delete(id) {
    return api.delete(`/auth/users/${id}/`);
  },
};