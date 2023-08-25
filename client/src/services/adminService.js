import http from "./httpService";

export async function getAllUsers() {
  const response = await http.get(`/users`);
  return response;
}

export async function getUserById(userId) {
  const response = await http.get(`/users/${userId}`);
  return response;
}

export async function createUser(body) {
  const response = await http.post(`/users`, body);
  return response;
}

export async function deleteUser(userId) {
  const response = await http.delete(`/users/${userId}`);
  return response;
}

export async function updateUser(userId, user) {
  const response = await http.put(`/users/${userId}`, user);
  return response;
}
