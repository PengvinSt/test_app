import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';

import { login } from '../../service';
import { LoginFormValues } from '../../components';

// import { register } from '@/lib/service';

// import { useToast } from '@/components/ui/use-toast';

interface Login {
  loginMutation: UseMutateAsyncFunction<
    { message: string },
    AxiosError<{ message: string }>,
    { body: LoginFormValues },
    unknown
  >;
  isLoginPending: boolean;
  isLoginSuccess: boolean;
};

export const useLogin = (): Login => {

  const { mutateAsync: loginMutation, isPending: isLoginPending, isSuccess:isLoginSuccess } =
    useMutation<
      { message: string },
      AxiosError<{ message: string }>,
      { body: any }
    >({
      mutationKey: ['register-user'],
      mutationFn: ({ body }: { body: LoginFormValues }) => login(body),
      onSuccess: () => {
        
      },
      onError: (error:AxiosError) => {
        if (error.response?.status === HttpStatusCode.BadRequest) {
        //   toast({
        //     title: 'Registration Error',
        //     description: error.response.data.message,
        //   });
        } else {
        //   toast({
        //     title: 'Registration Error',
        //     description: 'An unexpected error occurred',
        //   });
        }
      },
    });

  return { loginMutation, isLoginPending, isLoginSuccess };
};
