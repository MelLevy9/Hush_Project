import http from "./httpService";

export async function getMyGroupList(userId) {
  const response = await http.get(`/group-list/${userId}`);
  return response;
}
export async function addGroupToList(userId, groupId) {
    const data = {userId, groupId}
  const response = await http.post(`/group-list`, data);
  return response;
}

export async function deleteGroupFromList(groupId) {
  const response = await http.delete(`/group-list/${groupId}`);
  return response;
}

