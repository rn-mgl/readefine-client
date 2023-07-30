import jwt from "jsonwebtoken";

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  const decodedToken = jwt.decode(token);

  if (!decodedToken) {
    return true;
  }

  const currentTime = Date.now() / 1000;
  return currentTime > decodedToken.exp;
};
