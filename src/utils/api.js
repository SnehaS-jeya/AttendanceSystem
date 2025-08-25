
import jwt_decode from "jwt-decode";

export const getUserAccess = () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))
      ?.split('=')[1];

    if (token) {
      const decoded = jwt_decode(token);
      return decoded.access || [];
    }
  } catch (err) {
    console.error("JWT decode error:", err);
  }

  return [];
};
