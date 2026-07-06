const API_URL = "http://127.0.0.1:8000/api/v1";

async function request(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL + url, {
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
    ...options,
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
      body: JSON.stringify(data),
    });
  },

  put(url, data) {
    return request(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete(url) {
    return request(url, {
      method: "DELETE",
    });
  },
};