import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllTasks, createTask, deleteTasks, updateTasks } from "../api/tasks.api";
import type { Task } from "../types/task";

export const useTasksData = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks
  });

  const createMutation = useMutation({
    mutationFn: createTask,

    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [
        ...old,
        { ...newTask, id: "temp-id" }
      ]);

      return { previousTasks };
    },

    onError: (_err, _task, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },

     onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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

    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );

      return { previousTasks };
    },

    onError: (_err, _task, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  return {
    tasksList: tasksQuery.data,
    isLoading: tasksQuery.isLoading,
    getTaskError: tasksQuery.isError,

    createTask: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError:createMutation.isError,
    
    deleteTask: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    deleteError:deleteMutation.isError,

    updateTask: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError:updateMutation.isError,
  };
};
