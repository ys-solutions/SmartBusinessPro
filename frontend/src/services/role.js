import { api } from "./api";

export const roleService = {

    getAll() {
        return api.get("/auth/roles/");
    },

    get(id) {
        return api.get(`/auth/roles/${id}/`);
    },

    create(data) {
        return api.post("/auth/roles/", data);
    },

    update(id, data) {
        return api.put(`/auth/roles/${id}/`, data);
    },

    delete(id) {
        return api.delete(`/auth/roles/${id}/`);
    },

    getPermissions(id) {
        return api.get(`/auth/roles/${id}/permissions/`);
    },

    updatePermissions(id, data) {
        return api.put(`/auth/roles/${id}/permissions/`, data);
    },

};