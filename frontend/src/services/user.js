import { api } from "./api";

function buildFormData(data) {

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {

        if (
            value !== undefined &&
            value !== null
        ) {
            formData.append(key, value);
        }

    });

    return formData;

}

export const userService = {

    getAll() {

        return api.get("/auth/users/");

    },

    get(id) {

        return api.get(`/auth/users/${id}/`);

    },

    create(data) {

        return api.post(
            "/auth/users/",
            buildFormData(data)
        );

    },

    update(id, data) {

        return api.put(
            `/auth/users/${id}/`,
            buildFormData(data)
        );

    },

    delete(id) {

        return api.delete(`/auth/users/${id}/`);

    },

};