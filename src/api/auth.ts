import { API_ENDPOINTS } from "../constants/constants";
import api from "../lib/axios";

export const login = async (email: string, password: string) => {
  const res = await api.post(API_ENDPOINTS.LOGIN, { email, password });
  return res.data;
};

export const register = async (email: string, password: string) => {
  const res = await api.post(API_ENDPOINTS.REGISTER, { email, password });
  return res.data;
};

export const resendConfirmation = async (email: string) => {
  const res = await api.post(API_ENDPOINTS.RESEND_CONFIRMATION, null, { params: { email } });
  return res.data;
};