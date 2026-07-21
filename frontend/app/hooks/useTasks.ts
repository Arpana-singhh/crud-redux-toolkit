import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskService } from "@/app/service/api/task.service";

const taskKeys = {
  all: ["tasks"] as const,
};

export function useTasksQuery() {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: TaskService.getAll,
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskName: string) => TaskService.create(taskName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useEditTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      taskName,
      completed,
    }: {
      id: string;
      taskName?: string;
      completed?: boolean;
    }) => TaskService.update(id, { taskName, completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useRemoveTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => TaskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}
