export const AppName = "GymBuddy";

export const API_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  LOGIN: `/auth/login`,
  REGISTER: `/auth/register`,
  RESEND_CONFIRMATION: `/auth/resend-confirmation`,
};

export const APP_ROUTES = {
  LOGIN: `/login`,
  REGISTER: `/register`,
  HOME: `/home`,
  LANDING: `/`,
  EMAIL_CONFIRMED: `/email-confirmed`,
};

export const ModalType = {
  EMAIL: 'email',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info'
} as const;

export type ModalType = typeof ModalType[keyof typeof ModalType];