import { useQuery } from '@tanstack/react-query';
import { fetchProductInfo } from '@/apis/productInfo';
import { fetchProductDetail } from '@/apis/productDetail';
import { fetchProductReview } from '@/apis/productReview';
import { fetchProductWish } from '@/apis/productWish';
import type { ProductInfo } from '@/types/productInfo';
import type { ProductDetail } from '@/types/productDetail';
import type { ProductReview } from '@/types/productReview';
import type { ProductWish } from '@/types/productWish';

export const useProduct = (productId: number) => {
  const infoQuery = useQuery<ProductInfo>({
    queryKey: ['productInfo', productId],
    queryFn: () => fetchProductInfo(productId),
  });

  const detailQuery = useQuery<ProductDetail>({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  });

  const reviewQuery = useQuery<ProductReview>({
    queryKey: ['productReview', productId],
    queryFn: () => fetchProductReview(productId),
  });

  const wishQuery = useQuery<ProductWish>({
    queryKey: ['productWish', productId],
    queryFn: () => fetchProductWish(productId),
  });

  return {
    info: infoQuery.data,
    detail: detailQuery.data,
    review: reviewQuery.data,
    wish: wishQuery.data,
  };
};
