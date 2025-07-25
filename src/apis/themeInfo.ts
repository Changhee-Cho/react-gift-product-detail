import apiClient from '@/lib/apiClient';
import { THEME_INFO } from '@/apis/constants';
import type { themeInfo } from '@/types/themeInfo';

interface ThemeInfoResponse {
  data: themeInfo;
}

export const fetchThemeInfo = async (
  themeId: string | number
): Promise<themeInfo> => {
  const response = await apiClient.get<ThemeInfoResponse>(THEME_INFO(themeId));
  return response.data.data;
};
