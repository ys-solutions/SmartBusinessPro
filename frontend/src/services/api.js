const API_URL = "http://127.0.0.1:8000/api/v1";

async function refreshAccessToken() {

    const refresh = localStorage.getItem("refresh");

    if (!refresh) {
        return null;
    }

    const response = await fetch(`${API_URL}/auth/refresh/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refresh,
        }),
    });

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    localStorage.setItem("token", data.access);

    if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
    }

    return data.access;
}

async function request(url, options = {}) {

    let token = localStorage.getItem("token");

    let headers = {
        ...(options.headers || {}),
    };

    if (
        !url.startsWith("/auth/login") &&
        !url.startsWith("/auth/register")
    ) {

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

    }

    let body = options.body;

    if (body instanceof FormData) {

    } else {

        headers["Content-Type"] = "application/json";

        if (body) {
            body = JSON.stringify(body);
        }

    }

    let response = await fetch(API_URL + url, {
        ...options,
        headers,
        body,
    });

    // Token expiré
    if (response.status === 401) {

        const newToken = await refreshAccessToken();

        if (!newToken) {

            localStorage.removeItem("token");
            localStorage.removeItem("refresh");

            window.location.href = "/login";

            return;

        }

        headers.Authorization = `Bearer ${newToken}`;

        response = await fetch(API_URL + url, {
            ...options,
            headers,
            body,
        });

    }

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export const api = {

    get(url) {
        return request(url, {
            method: "GET",
        });
    },

    post(url, data) {
        return request(url, {
            method: "POST",
            body: data,
        });
    },

    put(url, data) {
        return request(url, {
            method: "PUT",
            body: data,
        });
    },

    delete(url) {
        return request(url, {
            method: "DELETE",
        });
    },

};