export const clientIsLogged = (token) => {
  if (!token || !token.startsWith("Bearer ")) {
    return false;
  }

  return true;
};

export const adminIsLogged = (token) => {
  if (!token || !token.startsWith("Admin Bearer ")) {
    return false;
  }

  return true;
};
