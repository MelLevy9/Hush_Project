import http from "./httpService";

export async function getAllGroups() {
  const response = await http.get('/groups');
  return response;
}

export async function getGroupById(groupId) {
  const response = await http.get(`/groups/${groupId}`);
  return response;
}

export async function getGroupPostsById(groupId) {
  const response = await http.get(`/groups/posts/${groupId}`);
  return response;
}

export async function createGroup(body) {
  const response = await http.post(`/groups`, body);
  return response;
}

export async function deleteGroup(groupId) {
  const response = await http.delete(`/groups/${groupId}`);
  return response;
}

export async function updateGroup(groupId, group) {
  const response = await http.put(`/groups/${groupId}`, group);
  return response;
}
