const API_URL = "http://127.0.0.1:8000/api/v1";

async function request(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // On n'ajoute PAS le token pour login/register
  if (
    !url.startsWith("/auth/login") &&
    !url.startsWith("/auth/register")
  ) {
    const token = localStorage.getItem("token");

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(API_URL + url, {
    ...options,
    headers,
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