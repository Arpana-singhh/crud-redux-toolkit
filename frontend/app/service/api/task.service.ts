import apiClient from "./apiClient";
import apiRoutes from "@/config/apiRoutes";

export type Task = {
  taskId: string;
  taskName: string;
  completed: boolean;
};

type CreateTaskPayload = {
  taskName: string;
};

type UpdateTaskPayload = {
  taskName?: string;
  completed?: boolean;
};

type DeleteTaskResponse = {
  message: string;
  task: Task;
};

export class TaskService {
  static async getAll(): Promise<Task[]> {
    const response = await apiClient.get<Task[]>(apiRoutes.task.getAll);
    return response.data;
  }

  static async create(taskName: string): Promise<Task> {
    const payload: CreateTaskPayload = { taskName };

    const response = await apiClient.post<Task>(apiRoutes.task.create, payload);
    return response.data;
  }

  static async update(id: string, payload: UpdateTaskPayload): Promise<Task> {
    const response = await apiClient.put<Task>(apiRoutes.task.update(id), payload);
    return response.data;
  }

  static async delete(id: string): Promise<DeleteTaskResponse> {
    const response = await apiClient.delete<DeleteTaskResponse>(
      apiRoutes.task.delete(id)
    );
    return response.data;
  }
}
