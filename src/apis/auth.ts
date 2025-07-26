import apiClient from '@/lib/apiClient';
import { LOGIN_API_URL } from '@/apis/constants';
import type { LoginParams } from '@/types/loginParams';
import type { LoginResponse } from '@/types/loginResponse';

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await apiClient.post(LOGIN_API_URL, params);
  return response.data.data;
};
