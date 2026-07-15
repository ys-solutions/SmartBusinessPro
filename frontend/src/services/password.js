import { api } from "@/services/api";

export const passwordService = {

    async change(payload) {

        return api.put(
            "/auth/change-password/",
            payload
        );

    },

};