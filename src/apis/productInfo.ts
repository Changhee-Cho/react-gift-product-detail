import apiClient from '@/lib/apiClient';
import { PRODUCT_INFO } from '@/apis/constants';
import type { ProductInfo } from '@/types/productInfo';

interface ProductInfoResponse {
  data: ProductInfo;
}

export const fetchProductInfo = async (
  productId: number
): Promise<ProductInfo> => {
  const response = await apiClient.get<ProductInfoResponse>(
    PRODUCT_INFO(productId)
  );

  return response.data.data;
};
