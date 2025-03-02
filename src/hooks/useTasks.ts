import { useCallback, useEffect, useState } from "react";
import { Task } from "../types/Task";

import api from "../services/api.ts";
import { API_ENDPOINTS } from "../../configs/apiEndpoints.ts";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.tasks);
        setTasks(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = useCallback(async (title: string) => {
    try {
      const response = await api.post(API_ENDPOINTS.tasks, { title });
      setTasks((prev) => [...prev, response.data]);
    } catch (err) {
      console.error(err);
      setError("Failed to add task");
    }
  }, []);

  const handleComplete = useCallback(async (id: number) => {
    try {
      const response = await api.patch(`${API_ENDPOINTS.tasks}/${id}`, {
        completed: true,
      });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task)),
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await api.delete(`${API_ENDPOINTS.tasks}/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  }, []);

  return { tasks, loading, error, handleAddTask, handleComplete, handleDelete };
};
