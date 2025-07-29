import apiClient from '@/lib/apiClient';
import { PRODUCT_DETAIL } from '@/apis/constants';
import type { ProductDetail } from '@/types/productDetail';

interface ProductDetailResponse {
  data: ProductDetail;
}

export const fetchProductDetail = async (
  productId: number
): Promise<ProductDetail> => {
  const response = await apiClient.get<ProductDetailResponse>(
    PRODUCT_DETAIL(productId)
  );

  return response.data.data;
};
