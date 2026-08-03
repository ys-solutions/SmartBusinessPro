import { api } from "./api";
import { tokenService } from "./token";

const API_URL = "http://127.0.0.1:8000/api/v1";

export const authService = {

    async login(data) {

        const res = await api.post("/auth/login/", data);

        if (res.success) {

            tokenService.saveTokens(
                res.data.tokens.access,
                res.data.tokens.refresh
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            localStorage.setItem(
                "permissions",
                JSON.stringify(res.data.permissions)
            );

        }

        return res;

    },

    async refreshToken() {

        const refresh = tokenService.getRefreshToken();

        if (!refresh) {

            throw new Error("Refresh token absent.");

        }

        const response = await fetch(
            `${API_URL}/auth/refresh/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {

            tokenService.clearTokens();

            throw data;

        }

        tokenService.saveTokens(
            data.data.access
        );

        return data.data.access;

    },

    logout() {

        tokenService.clearTokens();

        localStorage.removeItem("user");
        localStorage.removeItem("permissions");

    },

};