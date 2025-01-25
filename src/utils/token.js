const TOKEN_KEY = "jwt";
const EMAIL = "email";

export const setToken = (token, email) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL, email);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getEmail = () => {
  return localStorage.getItem(EMAIL);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
