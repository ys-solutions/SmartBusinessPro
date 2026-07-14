import api from "@/services/api";

export const profileService = {

    async get() {

        const { data } = await api.get(
            "/auth/profile/"
        );

        return data;

    },

    async update(payload) {

        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {

            if (value !== null && value !== undefined) {

                formData.append(key, value);

            }

        });

        const { data } = await api.put(
            "/auth/profile/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        return data;

    },

};