import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const loadUserDataFromCookie = async () => {
  const tokenCookie = Cookies.get('token');
  if (tokenCookie) {
    const userData = await jwtDecode(tokenCookie);
    return { userData, isAuthenticated: true };
  } else {
  return { userData: null, isAuthenticated: false };
}
};