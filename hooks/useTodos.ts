"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '@/services/todoService';

export function useTodos() {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getTodos,
  });

  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationFn: todoService.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: todoService.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos,
    isLoading,
    isError,
    error,
    createTodo,
    isCreating,
    deleteTodo,
    isDeleting,
  };
}