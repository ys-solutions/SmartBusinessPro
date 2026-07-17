import { api } from "./api";

export const profileService = {

    async get() {

        return await api.get("/auth/profile/");

    },

};