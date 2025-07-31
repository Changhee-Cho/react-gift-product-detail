import apiClient from '@/lib/apiClient';
import { PRODUCT_REVIEW } from '@/apis/constants';
import type { ProductReview } from '@/types/productReview';

interface ProductReviewResponse {
  data: ProductReview;
}

export const fetchProductReview = async (
  productId: number
): Promise<ProductReview> => {
  const response = await apiClient.get<ProductReviewResponse>(
    PRODUCT_REVIEW(productId)
  );

  return response.data.data;
};
