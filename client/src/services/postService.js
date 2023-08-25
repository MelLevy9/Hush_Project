import http from "./httpService";

export async function getAllPosts(pageNumber=1) {
  const response = http.get(`/posts?page=${pageNumber}`);
  return response;
}

export async function getPostById(postId) {
  const response = await http.get(`/posts/${postId}`);
  return response;
}

export async function getMyPostList(userId) {
  const response = await http.get(`/posts/user/${userId}`);
  return response;
}

export async function createPost(body) {
  const response = await http.post(`/posts`, body);
  return response;
}

export async function deletePost(userId) {
  const response = await http.delete(`/posts/${userId}`);
  return response;
}

export async function updatePost(userId, post) {
  const response = await http.put(`/posts/${userId}`, post);
  return response;
}

export async function searchPosts(searchQuery) {
try {
  const response = await http.get(`/posts/search?term=${searchQuery}`);
  return response;
} catch (error) {
  console.log(error)
}
}
