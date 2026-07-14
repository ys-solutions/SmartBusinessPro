import { api } from "@/services/api";

export const profileService = {

    async get() {

        return await api.get("/auth/profile/");

    },

    async update(payload) {

        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {

            if (value !== null && value !== undefined) {

                formData.append(key, value);

            }

        });

        return await api.put(
            "/auth/profile/",
            formData
        );

    },

};