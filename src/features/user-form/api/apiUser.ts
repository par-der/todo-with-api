import { User, UserInfo } from '@/shared/types/user.ts';
import { apiClient } from '@/shared/services/axios.ts';

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get('auth/users/me/');
  return data;
};

export const updateCurrentUser = async (payload: Partial<Pick<User, 'username' | 'email'>>): Promise<User> => {
  const { data } = await apiClient.patch('auth/users/me/', payload);
  return data;
};

export const changePassword = async (payload: { current_password: string; new_password: string }) => {
  return await apiClient.post('auth/users/set_password/', payload);
};

export const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('avatar', file);
  const { data } = await apiClient.patch('auth/users/me/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const setUsernameApi = async (payload: { new_username: string; current_password: string }) => {
  return await apiClient.post('auth/users/set_username/', payload);
};

export const getUserInfo = async (): Promise<UserInfo> => {
  const full = await getCurrentUser();
  const { id, username, email, first_name, last_name } = full;
  return { id, username, email, first_name, last_name };
};
