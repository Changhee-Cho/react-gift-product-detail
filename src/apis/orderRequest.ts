import apiClient from '@/lib/apiClient';
import { ORDER_REQUEST_API_URL } from './constants';

interface OrderRequestBody {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
}

interface CreateOrderResponse {
  data: {
    success: boolean;
  };
}

export const createOrder = async (
  authToken: string,
  body: OrderRequestBody
): Promise<CreateOrderResponse> => {
  const response = await apiClient.post<CreateOrderResponse>(
    ORDER_REQUEST_API_URL,
    body,
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
  return response.data;
};
