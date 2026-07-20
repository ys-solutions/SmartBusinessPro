export const tokenService = {

    getAccessToken() {

        return localStorage.getItem("token");

    },

    getRefreshToken() {

        return localStorage.getItem("refresh");

    },

    saveTokens(access, refresh = null) {

        localStorage.setItem("token", access);

        if (refresh) {

            localStorage.setItem("refresh", refresh);

        }

    },

    clearTokens() {

        localStorage.removeItem("token");
        localStorage.removeItem("refresh");

    },

};