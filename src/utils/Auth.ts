import { jwtDecode } from "jwt-decode";

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    console.log("Decoded token:", decoded.exp * 1000);
    
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getToken = () => localStorage.getItem("token");
