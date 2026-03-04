const baseUrl = "http://localhost:3001";

export const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

export const getItems = () => fetch(`${baseUrl}/items`).then(checkResponse);

export const addItem = (item, token) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(checkResponse);

export const deleteItem = (id, token) =>
  fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

  export const addCardLike = (id, token) =>
  fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: { authorization: `Bearer ${token}` },
  }).then(checkResponse);

export const removeCardLike = (id, token) =>
  fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then(checkResponse);

  export const updateUser = ({ name, avatar }, token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);