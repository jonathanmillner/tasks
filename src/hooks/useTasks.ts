import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../services/api";
import { API_ENDPOINTS } from "../../configs/apiEndpoints.ts";
import { Task } from "../types/Task";

export const useTasks = () => {
  const queryClient = useQueryClient();

  // Fetch tasks from the backend, then sort them by createdAt descending (latest first)
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.tasks);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnReconnect: true,
    select: (data) =>
      [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
  });

  // Mutation to add a new task.
  const addTaskMutation = useMutation<Task, unknown, string>({
    mutationFn: async (title: string) => {
      const response = await api.post(API_ENDPOINTS.tasks, { title });
      return response.data;
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [
        ...old,
        newTask,
      ]);
    },
  });

  // Mutation to mark a task as completed.
  const completeTaskMutation = useMutation<Task, unknown, number>({
    mutationFn: async (id: number) => {
      const response = await api.patch(`${API_ENDPOINTS.tasks}/${id}`, {
        completed: true,
      });
      return response.data;
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
    },
  });

  // Mutation to delete a task.
  const deleteTaskMutation = useMutation<number, unknown, number>({
    mutationFn: async (id: number) => {
      await api.delete(`${API_ENDPOINTS.tasks}/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.filter((task) => task.id !== deletedId),
      );
    },
  });

  // Expose a clean interface.
  const handleAddTask = async (title: string) =>
    addTaskMutation.mutateAsync(title);
  const handleComplete = async (id: number) =>
    completeTaskMutation.mutateAsync(id);
  const handleDelete = async (id: number) => deleteTaskMutation.mutateAsync(id);

  return {
    tasks,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    handleAddTask,
    handleComplete,
    handleDelete,
  };
};
