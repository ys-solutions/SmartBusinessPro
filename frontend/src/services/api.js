const API_URL = "http://127.0.0.1:8000/api/v1";

export const api = {
  post: async (url, data) => {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  get: async (url) => {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + url, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return res.json();
  },
};