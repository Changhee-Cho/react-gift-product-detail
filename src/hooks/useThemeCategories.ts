import { useSuspenseQuery } from '@tanstack/react-query';
import apiClient from '@src/lib/apiClient';
import { PRESENT_THEMES_URL } from '@src/apis/constants';
import { STALE_TIME } from '@/constants/apiReactQueryStaleTime';
import { QUERY_KEYS } from '@/constants/queryKey';

type Theme = {
  themeId: number;
  name: string;
  image: string;
};

type ThemeState = {
  error: boolean;
  categories: Theme[];
};

const fetchThemes = async (): Promise<Theme[]> => {
  const response = await apiClient.get(PRESENT_THEMES_URL);
  return response.data?.data ?? [];
};

const useThemeCategories = (): ThemeState => {
  const { data, isError } = useSuspenseQuery<Theme[], Error>({
    queryKey: QUERY_KEYS.themeCategories,
    queryFn: fetchThemes,
    staleTime: STALE_TIME,
    retry: false,
  });

  return {
    error: isError,
    categories: data ?? [],
  };
};

export default useThemeCategories;
