import { api } from "./api";

export const userService = {
  async getAll() {
    return await api.get("/auth/users/");
  },

  async create(data) {
    return await api.post("/auth/users/", data);
  },

  async update(id, data) {
    return await api.put(`/auth/users/${id}/`, data);
  },

  async delete(id) {
    return await api.delete(`/auth/users/${id}/`);
  },
};