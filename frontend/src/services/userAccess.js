import { api } from "./api";

export const userAccessService = {
  update(id, data) {
    return api.put(`/auth/users/${id}/access/`, data);
  },
};