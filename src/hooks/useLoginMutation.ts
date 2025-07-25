import { useMutation } from '@tanstack/react-query';
import { login } from '@/apis/auth';
import type { LoginResponse } from '@/types/loginResponse';
import type { LoginParams } from '@/types/loginParams';
import { toast } from 'react-toastify';

const DEFAULT_ERROR_MESSAGE = '로그인에 실패했습니다.';

const useLoginMutation = () => {
  const mutation = useMutation<LoginResponse, any, LoginParams>({
    mutationFn: login,
    onError: (error: any) => {
      const status = error?.response?.status;
      const errorMessage =
        error?.response?.data?.data?.message || DEFAULT_ERROR_MESSAGE;
      if (status >= 400 && status < 500) {
        toast.error(errorMessage);
      }
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};

export default useLoginMutation;
