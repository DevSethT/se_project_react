const baseUrl = "http://localhost:3001";

export const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

export const getItems = () => fetch(`${baseUrl}/items`).then(checkResponse);

export const addItem = (item) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(checkResponse);

export const deleteItem = (id) =>
  fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
