"use client";

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { loginSuccess } from '@/store/features/auth/authSlice';
import { authService } from '@/services/authService';
import { useMutation } from '@tanstack/react-query';

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutate: login, isPending: isLoggingIn, error } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      router.push('/todos');
    },
  });
  return { login, isLoggingIn, error };
}