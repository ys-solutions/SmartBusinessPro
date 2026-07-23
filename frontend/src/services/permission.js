import { api } from "./api";

export const permissionService = {

    async getAll() {

        return await api.get("/auth/permissions/");

    },

    async create(data) {

        return await api.post("/auth/permissions/", data);

    },

    async update(id, data) {

        return await api.put(`/auth/permissions/${id}/`, data);

    },

    async delete(id) {

        return await api.delete(`/auth/permissions/${id}/`);

    },

};