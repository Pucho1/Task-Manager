import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllTasks, createTask, deleteTasks, updateTasks } from "../api/tasks.api";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return {
    tasksList: tasksQuery.data,
    isLoading: tasksQuery.isLoading,

    createTask: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    
    deleteTask: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,

    updateTask: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
};
