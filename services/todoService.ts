import apiClient from '@/lib/axios';

export interface Todo {
  id: number | string;
  title: string;
  completed: boolean;
}

export type NewTodoPayload = Pick<Todo, 'title'>;

export const todoService = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get<Todo[]>('/todos');
    return response.data;
  },

  createTodo: async (payload: NewTodoPayload): Promise<Todo> => {
    const response = await apiClient.post<Todo>('/todos', payload);
    return response.data;
  },

  deleteTodo: async (id: number | string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },
};