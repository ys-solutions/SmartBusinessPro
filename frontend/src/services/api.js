const API_URL = "http://127.0.0.1:8000/api/v1";

async function request(url, options = {}) {

    const headers = {
        ...(options.headers || {}),
    };

    const token = localStorage.getItem("token");

    if (
        !url.startsWith("/auth/login") &&
        !url.startsWith("/auth/register")
    ) {
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    

    let body = options.body;

    // Si body est un FormData, ne pas définir Content-Type
    if (body instanceof FormData) {

        // Le navigateur ajoutera automatiquement :
        // multipart/form-data; boundary=...

    } else {

        headers["Content-Type"] = "application/json";

        if (body) {
            body = JSON.stringify(body);
        }

    }


    console.log("HEADERS =", headers);
    const response = await fetch(API_URL + url, {
        ...options,
        headers,
        body,
    });

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