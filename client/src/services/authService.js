import http from '../services/httpService';
import Cookies from 'js-cookie';

export const signIn = async (email, password) => {
  const response = await http.post('/auth/signin', { email, password });
  return response.data;
};

export const signOut = async () => {
  Cookies.remove('token');
};

export const signUp = async (userName, email, password) => {
  const response = await http.post('/auth/signup', { userName, email, password });
  return response.data;
};