import apiClient from '@/lib/apiClient';

// wish를 업데이트하는 API가 정의되지 않았으므로 낙관적 업데이트를 보여주기 위해 임의로 경로 지정
export const toggleWish = async (productId: number) => {
  const response = await apiClient.post(`/products/${productId}/wish`);
  return response.data;
};
