import { useSuspenseQuery } from '@tanstack/react-query';
import apiClient from '@src/lib/apiClient';
import { REALTIME_API_URL } from '@src/apis/constants';
import { STALE_TIME } from '@/constants/apiReactQueryStaleTime';
import { QUERY_KEYS } from '@/constants/queryKey';

export type Product = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export type RankingProductParams = {
  targetType: string;
  rankType: string;
};

const fetchRankingProducts = async ({
  targetType,
  rankType,
}: RankingProductParams): Promise<Product[]> => {
  const response = await apiClient.get(REALTIME_API_URL, {
    params: { targetType, rankType },
  });
  return response.data?.data ?? [];
};

type RankingProductState = {
  error: boolean;
  products: Product[];
};

const useRankingProducts = ({
  targetType,
  rankType,
}: RankingProductParams): RankingProductState => {
  const { data, isError } = useSuspenseQuery<Product[], Error>({
    queryKey: QUERY_KEYS.rankingProducts(targetType, rankType),
    queryFn: () => fetchRankingProducts({ targetType, rankType }),
    staleTime: STALE_TIME,
    retry: false,
  });

  return {
    error: isError,
    products: data ?? [],
  };
};

export default useRankingProducts;
