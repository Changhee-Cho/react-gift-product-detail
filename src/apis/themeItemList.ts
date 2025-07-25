import apiClient from '@/lib/apiClient';
import { THEME_ITEM_LIST } from '@/apis/constants';
import type { themeItemInfo } from '@/types/themeItemInfo';

const DEFAULT_CURSOR = 0;
const DEFAULT_LIMIT = 10;

interface ThemeItemListData {
  list: themeItemInfo[];
  cursor: number;
  hasMoreList: boolean;
}

interface ThemeItemListResponse {
  data: ThemeItemListData;
}

export const fetchThemeItemList = async (
  themeId: string | number,
  cursor: number = DEFAULT_CURSOR,
  limit: number = DEFAULT_LIMIT
): Promise<ThemeItemListData> => {
  const response = await apiClient.get<ThemeItemListResponse>(
    THEME_ITEM_LIST(themeId),
    {
      params: { cursor, limit },
    }
  );

  return response.data.data;
};
