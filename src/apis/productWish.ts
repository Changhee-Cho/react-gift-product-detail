import apiClient from '@/lib/apiClient';
import { PRODUCT_WISH } from '@/apis/constants';
import type { ProductWish } from '@/types/productWish';

interface ProductWishResponse {
  data: ProductWish;
}

export const fetchProductWish = async (
  productId: number
): Promise<ProductWish> => {
  const response = await apiClient.get<ProductWishResponse>(
    PRODUCT_WISH(productId)
  );

  return response.data.data;
};
