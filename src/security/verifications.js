export const clientIsLogged = () => {
  const token = localStorage.getItem("readefine_token");

  if (!token || !token.startsWith("Bearer ")) {
    return false;
  }

  return true;
};

export const adminIsLogged = () => {
  const token = localStorage.getItem("readefine_admin_token");

  if (!token || !token.startsWith("Admin Bearer ")) {
    return false;
  }

  return true;
};
